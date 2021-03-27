import { useReducer, useState, useEffect, useRef, useCallback } from "react";

const API_BASE_URL =
  "https://newsapi.org/v2/everything?apiKey=f0314630b1d64516bc522a83c6c5b6c0&pageSize=20&q=";

export async function apiGet(
  queryString: string,
  page: number,
  sortBy: string
): Promise<any> {
  const response = await fetch(
    `${API_BASE_URL}${queryString}&page=${page}&sortBy=${sortBy}`
  ).then((response) => response.json());

  return response;
}

// function showsReducer(prevState, action) {
//   switch (action.type) {
//     case "ADD": {
//       return [...prevState, action.showId];
//     }
//     case "REMOVE": {
//       return prevState.filter((showId) => showId !== action.showId);
//     }

//     default:
//       return prevState;
//   }
// }

// function usePersistedReducer(reducer, initialState, key) {
//   //setting an initial state
//   const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
//     const persisted = localStorage.getItem(key);

//     return persisted ? JSON.parse(persisted) : initial;
//   });

//   //achieve synchronization with local storage
//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(state));
//   }, [state, key]);

//   return [state, dispatch];
// }

// // add or remove shows
// export function useShows(key = "shows") {
//   return usePersistedReducer(showsReducer, [], key);
// }

// export function useLastQuery(key = "lastQuery") {
//   const [input, setInput] = useState(() => {
//     const persisted = sessionStorage.getItem(key);

//     return persisted ? JSON.parse(persisted) : "";
//   });

//   const setPersistedInput = useCallback(
//     (newState) => {
//       setInput(newState);
//       sessionStorage.setItem(key, JSON.stringify(newState));
//     },
//     [key]
//   );

//   return [input, setPersistedInput];
// }

// const reducer = (prevState, action) => {
//   switch (action.type) {
//     case "FETCH_SUCCESS": {
//       return {
//         isLoading: false,
//         error: null,
//         show: action.show,
//       };
//     }

//     case "FETCH_FAILED": {
//       return {
//         ...prevState,
//         isLoading: false,
//         error: action.error,
//       };
//     }

//     default:
//       return prevState;
//   }
// };

// export function useShow(query) {
//   const [state, dispatch] = useReducer(reducer, {
//     show: null,
//     isLoading: true,
//     error: null,
//   });
//   useEffect(() => {
//     let isMounted = true;
//     apiGet(`/shows/${query}?embed[]=seasons&embed[]=cast`)
//       .then((results) => {
//         if (isMounted) {
//           dispatch({ type: "FETCH_SUCCESS", show: results });
//         }
//       })
//       .catch((err) => {
//         if (isMounted) {
//           dispatch({ type: "FETCH_FAILED", error: err.message });
//         }
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [showId]);

//   return state;
// }
