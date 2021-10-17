import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
//import * as ReactRouterDom from 'react-router-dom';
import FirebaseContext from "../../context/firebase";
import LoginPage from "../../pages/loginPage";
import { AppRoutes } from "../../constants/contants";
import { act } from "react-dom/test-utils";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  })
}));

describe("<LoginPage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login page with a form submission and logs the user in", async () => {
    const succeedToLogin = jest.fn(() => Promise.resolve("I am signed in! "));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeedToLogin
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <LoginPage />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      expect(document.title).toEqual("Login - Instagram");

      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "test@mail.ru" }
      });

      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "test123" }
      });

      fireEvent.submit(getByTestId("login"));

      expect(succeedToLogin).toHaveBeenCalled();
      expect(succeedToLogin).toHaveBeenCalledWith("test@mail.ru", "test123");

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(AppRoutes.DASHBOARD);
        expect(getByPlaceholderText("Email address").value).toBe("test@mail.ru");
        expect(getByPlaceholderText("Password").value).toBe("test123");
        expect(queryByTestId("error")).toBeFalsy();
      })
    });
  });


  it("renders the login page with a form submission and fails to login the user", async () => {
    const failToLogin = jest.fn(() => Promise.reject(new Error("Cannot sign in! ")));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <LoginPage />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      expect(document.title).toEqual("Login - Instagram");

      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "test.ru" }
      });

      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "test123" }
      });

      fireEvent.submit(getByTestId("login"));

      expect(failToLogin).toHaveBeenCalled();
      expect(failToLogin).toHaveBeenCalledWith("test.ru", "test123");
      expect(failToLogin).rejects.toThrow("Cannot sign in")

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(AppRoutes.DASHBOARD);
        expect(getByPlaceholderText("Email address").value).toBe("");
        expect(getByPlaceholderText("Password").value).toBe("");
        expect(queryByTestId("error")).toBeTruthy();
      })
    });
  });
});