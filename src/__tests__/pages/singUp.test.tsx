import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import SignUpPage from "../../pages/signUpPage";
import FirebaseContext from "../../context/firebase";
import { doesUsernameExist } from "../../services/firebase";
import { AppRoutes } from "../../constants/contants";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock("../../services/firebase");

describe("<SignUpPage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign up page with a form submission and sign a user up", async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          add: jest.fn((): Promise<string> => Promise.resolve("User added"))
        }))
      })),
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile:
              jest.fn((): Promise<string> => Promise.resolve("I am signed up"))
          }
        }))
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUpPage />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(
        (): Promise<boolean> => Promise.resolve(true)
      );
      // as true but inverse in the code

      await fireEvent.change(
        getByPlaceholderText("Username"),
        { target: { value: "test" } }
      );

      await fireEvent.change(
        getByPlaceholderText("Full name"),
        { target: { value: "testing" } }
      );

      await fireEvent.change(
        getByPlaceholderText("Email address"),
        { target: { value: "test@mail.ru" } }
      );

      await fireEvent.change(
        getByPlaceholderText("Password"),
        { target: { value: "test123" } }
      );

      fireEvent.submit(getByTestId("sign-up"));

      expect(document.title).toEqual("Sign Up - Instagram");
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith("test");

      await waitFor((): void => {
        expect(mockHistoryPush).toHaveBeenCalledWith(AppRoutes.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("test");
        expect(getByPlaceholderText("Full name").value).toBe("testing");
        expect(getByPlaceholderText("Email address").value).toBe("test@mail.ru");
        expect(getByPlaceholderText("Password").value).toBe("test123");
        expect(queryByTestId("error")).toBeFalsy();
      })
    });
  });


  it("renders the sign up page but an error is present (username exists)", async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: { updateProfile: jest.fn(() => Promise.resolve({})) }
        }))
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUpPage />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async (): Promise<void> => {
      doesUsernameExist.mockImplementation(
        (): Promise<boolean> => Promise.resolve(false)
      );
      // as true but inverse in the code

      await fireEvent.change(
        getByPlaceholderText("Username"),
        { target: { value: "test" } }
      );

      await fireEvent.change(
        getByPlaceholderText("Full name"),
        { target: { value: "testing" } }
      );

      await fireEvent.change(
        getByPlaceholderText("Email address"),
        { target: { value: "test@mail.ru" } }
      );

      await fireEvent.change(
        getByPlaceholderText("Password"),
        { target: { value: "test123" } }
      );

      fireEvent.submit(getByTestId("sign-up"));

      expect(document.title).toEqual("Sign Up - Instagram");
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith("test");

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(AppRoutes.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("test");
        expect(getByPlaceholderText("Full name").value).toBe("");
        expect(getByPlaceholderText("Email address").value).toBe("");
        expect(getByPlaceholderText("Password").value).toBe("");
        expect(queryByTestId("error")).toBeTruthy();
      })
    });
  });

  it("renders the sign up page but an error is thrown", async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile:
              jest.fn((): Promise<never> =>
                Promise.reject(new Error("Username exists"))
              )
          }
        }))
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUpPage />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(
        (): Promise<boolean> => Promise.resolve(false)
      );
      // as true but inverse in the code

      await fireEvent.change(
        getByPlaceholderText("Username"),
        { target: { value: "test" } }
      );

      await fireEvent.change(
        getByPlaceholderText("Full name"),
        { target: { value: "testing" } }
      );

      await fireEvent.change(
        getByPlaceholderText("Email address"),
        { target: { value: "test@mail.ru" } }
      );

      await fireEvent.change(
        getByPlaceholderText("Password"),
        { target: { value: "test123" } }
      );

      fireEvent.submit(getByTestId("sign-up"));

      expect(document.title).toEqual("Sign Up - Instagram");

      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith("test");

      await waitFor((): void => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(AppRoutes.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("test");
        expect(getByPlaceholderText("Full name").value).toBe("");
        expect(getByPlaceholderText("Email address").value).toBe("");
        expect(getByPlaceholderText("Password").value).toBe("");
        expect(queryByTestId("error")).toBeTruthy();
      });
    });
  });
})