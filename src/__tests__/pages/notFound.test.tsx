import React from "react";
import { render } from "@testing-library/react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import NotFoundPage from "../../pages/notFoundPage";
import { BrowserRouter as Router } from "react-router-dom";
import { getUserByUserId } from "../../services/firebase";
import userFoxture from "../../fixtures/logged-in-user";
import { act } from "react-dom/test-utils";

const firebase = {
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({
      user: { updateProfile: jest.fn(() => Promise.resolve("I am signed up")) }
    }))
  }))
};


describe("<NotFoundPage />", () => {
  it("renders the not found page with a logged in user", async () => {

    const { getByText } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <UserContext.Provider value={{ user: {} }}>
            <NotFoundPage />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    );

    expect(getByText("Not Found!")).toBeTruthy();
    expect(document.title).toEqual("Not Found - Instagram");

  });

  it(
    "renders the not found page with a anon user",
    async () => {

      const { getByText } = render(
        <Router>
          <FirebaseContext.Provider value={{ firebase }}>
            <UserContext.Provider value={{ user: null }}>
              <NotFoundPage />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      expect(getByText("Not Found!")).toBeTruthy();
      expect(document.title).toEqual("Not Found - Instagram");
    });
});