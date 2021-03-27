import { useReducer, useState, useEffect, useRef, useCallback } from "react";

const API_BASE_URL =
  "https://newsapi.org/v2/everything?apiKey=a4da606719284ef3ae2d5f494f5412f3&pageSize=20&q=";

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
