import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function BoardPage() {
  const params = useParams();
  console.log("boardId", params.boardId);
  console.log("params", params);

  return <h3>BoardPage</h3>;
}
