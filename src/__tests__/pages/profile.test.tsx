import React from "react";
import { render, waitFor, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import ProfilePage from "../../pages/profilePage";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase"
import LoggedInUserContext from "../../context/loggedInUser";
import userFixture from "../../fixtures/logged-in-user";
import photosFixture from "../../fixtures/timeline-photos";
import suggestedProfileFixture from "../../fixtures/timeline-photos";
import { getPhotos, getSuggestedProfiles, getUserByUsername, getUserPhotosByUserId } from "../../services/firebase";
import profileThatIsFollowedByTheLoggedInUser from "../../fixtures/profile-followed-by-logged-in-user";
import profileThatNotIsFollowedByTheLoggedInUser from "../../fixtures/profile-not-followed-by-logged-in-user";
import useUser from "../../hooks/useUser";
import { AppRoutes } from "../../constants/contants";
import { screen } from "@testing-library/dom";

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

describe("ProfilePage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(
    "renders the profile page with a user profile",
    async () => {
      await act(async () => {
        getUserByUsername.mockImplementation(() => [userFixture]);
        getUserPhotosByUserId.mockImplementation(() => photosFixture);
        useUser.mockImplementation(() => ({ user: userFixture }));


        const { getByText, getByTitle } = render(
          <Router>
            <FirebaseContext.Provider value={{
              firebase: {
                auth: jest.fn(() => ({
                  signOut: jest.fn(() => Promise.resolve({}))
                }))
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
                <ProfilePage />
              </UserContext.Provider>
            </FirebaseContext.Provider >
          </Router>
        );

        await waitFor(() => {
          expect(mockHistoryPush).not.toHaveBeenCalled();
          expect(mockHistoryPush).not.toHaveBeenCalledWith(AppRoutes.NOT_FOUND);
          expect(getUserByUsername).toHaveBeenCalledWith("orwell");
          expect(getByTitle("Sign Out")).toBeTruthy();
          expect(getByText("test")).toBeTruthy();
          expect(getByText("testing")).toBeTruthy();
          expect(getByText("photos")).toBeTruthy();

          screen.getByText((content: any, node: any) => {
            const hasText = (node: any) => node.textContent === "5 photos";
            const nodeHasText = hasText(node);
            const childrenDontHaveText =
              Array.from(node.children).every((child: any) =>
                !hasText(child));

            return nodeHasText && childrenDontHaveText;
          });

          screen.getByText((content: any, node: any) => {
            const hasText = (node: any) => node.textContent === "3 followers";
            const nodeHasText = hasText(node);
            const childrenDontHaveText =
              Array.from(node.children).every((child: any) =>
                !hasText(child));

            return nodeHasText && childrenDontHaveText;
          });

          screen.getByText((content: any, node: any) => {
            const hasText = (node: any) => node.textContent === "2 following";
            const nodeHasText = hasText(node);
            const childrenDontHaveText =
              Array.from(node.children).every((child: any) =>
                !hasText(child));

            return nodeHasText && childrenDontHaveText;
          });
        });

        fireEvent.click(getByTitle("Sign Out"));
        fireEvent.keyDown(getByTitle("Sign Out"), {
          key: "Enter"
        });

        expect(mockHistoryPush).toHaveBeenCalledWith(AppRoutes.LOGIN);

      });
    }
  )
})