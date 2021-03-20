import axios from "axios";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getSinglesMatches,
  getDoublesMatches,
} from "../services/user.services";
import DisplaySingles from '../components/DisplaySingles'
import DisplayDoubles from '../components/DisplayDoubles'
import DatePicker from 'react-datepicker';

export default function profile() {
  const [doubles, setDoubles] = useState(undefined);
  const [singles, setSingles] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [startDate, setStartDate] = useState(new Date());    

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
        console.log('backend singles', data.data.data)
        setSingles(data.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    getDoublesMatches().then(
      (data) => {
        console.log('backend doubles', data.data.data)
        setDoubles(data.data.data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <div>My Profile!</div>
          <DisplaySingles singles={singles} />
          <DisplayDoubles doubles={doubles} />
        </>
      )}
    </>
  );
}
