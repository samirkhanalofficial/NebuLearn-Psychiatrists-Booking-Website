import Post from "@/components/Post";
import React from "react";
import Comment from "@/components/Comment";

export default function test() {
  return (
    <div>
      <div>
        <Post userName={"Sumit Ray"} comments={"Hi there how are you? "} />
      </div>
      <div>
        <Comment userName="Sumit Ray " comments="this is the soln" />
      </div>
    </div>
  );
}
