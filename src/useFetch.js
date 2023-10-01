import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    //simulate the real api request delay
    setTimeout(() => {
      //Assocciate abort contoller with this fetch
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            //check for api return not success error, like not exist ect, it will then be catched with msg
            throw Error("could not fecth the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          console.log(err);
          if (err.name === "AbortError") {
            //when abort and stop fetch, it will trigger the catch, so judge here
            console.log("Fetch aborted");
          } else {
            //catch network connection error
            setError(err.message);
            setIsPending(false);
          }
        });
    }, 1000);
    //cleanup function that stop the associated fetch
    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
};
export default useFetch;
