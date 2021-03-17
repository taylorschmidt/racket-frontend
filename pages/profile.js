import axios from "axios";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getSinglesMatches,
  getDoublesMatches,
} from "../services/user.services";

export default function profile() {
  const [doubles, setDoubles] = useState(undefined);
  const [singles, setSingles] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    getCurrentUser().then(
      (data) => {
        setCurrentUser(data.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    getSinglesMatches().then(
      (data) => {
        console.log('backend', data.data.data)
        setSingles(data.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    getDoublesMatches().then(
      (data) => {
        setDoubles(data.data.data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('sing state', singles)
    console.log(doubles)
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <div>My Profile!</div>
          <div>{currentUser[0].id}</div>
          <div>{singles[0].id}</div>
          <div>{doubles[0].notes}</div>
        </>
      )}
    </>
  );
}
