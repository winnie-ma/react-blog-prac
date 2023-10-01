import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    //simulate the real api request delay
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            //check for api return not success error, like not exist ect, it will then be catched with msg
            throw Error("could not fecth the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          //catch network connection error
          setError(err.message);
          setIsPending(false);
        });
    }, 1000);
  }, [url]);
  return { data, isPending, error };
};
export default useFetch;
