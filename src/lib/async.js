import fetch from "node-fetch";
const getPeoplePromise = fetch => {
  return fetch("https://swapi.co/api/people")
    .then(res => res.json())
    .then(data => {
      return {
        count: data.count,
        // สร้างปลอมขึ้นมา
        data: data.data,
        results: data.results
      };
    });
};

const getPeople = async fetch => {
  const getRequest = await fetch("https://swapi.co/api/people");
  const data = await getRequest.json();
  return {
    count: data.count,
    results: data.results
  };
};

export default {
  getPeople,
  getPeoplePromise
};
