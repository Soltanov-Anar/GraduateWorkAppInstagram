import React from "react";
import { render, waitFor, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import DashboardPage from "../../pages/dashboardPage";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase"
import LoggedInUserContext from "../../context/loggedInUser";
import userFixture from "../../fixtures/logged-in-user";
import photosFixture from "../../fixtures/timeline-photos";
import suggestedProfileFixture from "../../fixtures/timeline-photos";
import { getPhotos, getSuggestedProfiles } from "../../services/firebase";
import useUser from "../../hooks/useUser";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ username: "orwell" }),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock("../../services/firebase");
jest.mock("../../hooks/useUser");

describe("<DashboardPage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it(
    "renders the dashboard with a user profile and follows a user from the suggested profile",
    async () => {
      await act(async () => {
        getPhotos.mockImplementation(() => photosFixture);
        getSuggestedProfiles.mockImplementation(() => suggestedProfileFixture);
        useUser.mockImplementation(() => ({ user: userFixture }));

        const {
          getByText,
          getByAltText,
          getByTitle,
          getAllByText,
          getAllByAltText,
          getByTestId
        } = render(
          <Router>
            <FirebaseContext.Provider
              value={{
                firebase: {
                  firestore: jest.fn(() => ({
                    collection: jest.fn(() => ({
                      doc: jest.fn(() => ({
                        update: jest.fn(() => Promise.resolve('User added'))
                      }))
                    }))
                  }))
                },
                FieldValue: {
                  arrayUnion: jest.fn(),
                  arrayRemove: jest.fn()
                }
              }}
            >
              <UserContext.Provider value={{
                user: {
                  uid: "FMerbRlQuMRli28EoqHnZLptoTi2",
                  displayName: "test"
                }
              }}
              >
                <LoggedInUserContext.Provider
                  value={{ user: userFixture }}
                >
                  <DashboardPage
                    user={{
                      uid: "FMerbRlQuMRli28EoqHnZLptoTi2", displayName: "test"
                    }}
                  />
                </LoggedInUserContext.Provider>
              </UserContext.Provider>
            </FirebaseContext.Provider >
          </Router>
        );

        await waitFor(() => {
          expect(document.title).toEqual("Instagram");
          expect(getByTitle("Sign Out")).toBeTruthy();
          expect(getAllByText("raphael")).toBeTruthy();
          expect(getAllByAltText("Instagram")).toBeTruthy();
          expect(getByAltText("test profile")).toBeTruthy();
          expect(getAllByText("Saint George and the Dragon")).toBeTruthy();
          expect(getByText("Suggestions for you")).toBeTruthy();

          fireEvent.click(getAllByText("Follow")[0]);
          fireEvent.click(getByTestId("like-photo-494LKmaF03bUcYZ4xhNu"));
          fireEvent.keyDown(getByTestId("like-photo-494LKmaF03bUcYZ4xhNu"), {
            key: "Enter"
          });
          fireEvent.click(getByTestId("focus-input-494LKmaF03bUcYZ4xhNu"));

        });

        fireEvent.change(getByTestId("add-comment-nJMT1l8msuNZ8tH3zvVI"), {
          target: { value: "Great photo!" }
        });

        fireEvent.submit(getByTestId("add-comment-submit-nJMT1l8msuNZ8tH3zvVI"));

        fireEvent.change(getByTestId("add-comment-nJMT1l8msuNZ8tH3zvVI"), {
          target: { value: "" }
        });

        fireEvent.keyDown(getByTestId("focus-input-494LKmaF03bUcYZ4xhNu"), {
          key: "Enter"
        });

        fireEvent.submit(getByTestId("add-comment-submit-nJMT1l8msuNZ8tH3zvVI"));

      });
    });

  it(
    "renders the dashboard with a user profile of undefined to trigger fallbacks",
    async () => {
      await act(async () => {
        getPhotos.mockImplementation(() => photosFixture);
        // need the suggested profiled fixture
        getSuggestedProfiles.mockImplementation(
          () => suggestedProfileFixture);

        useUser.mockImplementation(() => ({ user: undefined }));

        const firebase = {
          auth: jest.fn(() => ({
            signOut: jest.fn(() => ({
              updateProfile: jest.fn(() => Promise.resolve({}))
            }))
          }))
        };

        const { getByText } = render(
          <Router>
            <FirebaseContext.Provider value={{ firebase }}>
              <UserContext.Provider value={{
                user: {
                  uid: "FMerbRlQuMRli28EoqHnZLptoTi2",
                  displayName: "test"
                }
              }}
              >
                <LoggedInUserContext.Provider
                  value={{ user: userFixture }}
                >
                  <DashboardPage
                    user={{
                      uid: "FMerbRlQuMRli28EoqHnZLptoTi2", displayName: "test"
                    }}
                  />
                </LoggedInUserContext.Provider>
              </UserContext.Provider>
            </FirebaseContext.Provider >
          </Router>
        );

        expect(getByText("Login")).toBeTruthy();
        expect(getByText("Sign Up")).toBeTruthy();
      });
    });
});