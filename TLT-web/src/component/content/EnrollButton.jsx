import React from "react";
import Headings from "../utiliti/heading/Heading";
import Button from "../utiliti/buttons/Button";

const EnrollButton = () => {
  return (
    <>
      <div className="bg-img relative">
        <div className="py-10 backdrop-blur-sm bg-black/80">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/2 p-4 ">
              <Headings heading={"h2"} style={"text-white text-center"}>
                Enroll to <span className="text-primary">Build</span> your{" "}
                <span className="text-primary">Judiciary Pathway</span>
              </Headings>
            </div>
            <div className="w-full md:w-1/2 p-4 text-center lg:text-end">
              <Button color="red"> Discover More </Button>{" "}
              <Button color="white"> Contact Us</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollButton;
