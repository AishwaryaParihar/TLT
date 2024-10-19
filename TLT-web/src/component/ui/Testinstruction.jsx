import React from "react";
import { instructiondata } from "../data/instructiondata";
import Testinstruction2 from "./Testinstruction2";
import { NavLink } from "react-router-dom";
const Testinstruction = () => {
  return (
    <>
      {instructiondata.map((items, index) => (
        <div
          className="flex flex-col justify-center px-5
           sm:px-20 "
          key={index}
        >
          <h6 className="text-primary font-bold text-3xl my-5">
            General Instructions:
          </h6>
          <dl>
            <li>{items.in1}</li>
            <li>{items.in2}</li>
            <li>{items.in3} </li>
            <li>{items.in3_1}</li>
            <li>{items.in3_2}</li>
            <li>{items.in3_3}</li>
            <li>{items.in4}</li>
            <li>{items.in5}</li>
            <li>{items.in6}</li>
            <table className="my-5 p-10">
              <tbody className="border bottom-2 m-5 gap-6 ">
                <tr className="border border-1 gap-8">
                  <th>{items.t_heading}</th>
                  <th className="pe-2 border-l-2">{items.t_heading2}</th>
                  <th className="pe-2 border-l-2">{items.t_heading3}</th>
                  <th className="border-l-2">{items.t_heading4}</th>
                </tr>
                <tr className="border border-1">
                  <td className="pe-5">{items.sdata}</td>
                  <td className="ps-10 border-l-2">{items.sdata2}</td>
                  <td className="ps-10 border-l-2">{items.sdata3}</td>
                  <td className="border-l-2">{items.sdata4}</td>
                </tr>
                <tr className="border border-1">
                  <td className="pe-5">{items.ndata}</td>
                  <td className="ps-10 border-l-2">{items.ndata2}</td>
                  <td className="ps-10 border-l-2">{items.ndata3}</td>
                  <td className="border-l-2">{items.ndata4}</td>
                </tr>
                <tr className="border border-1 border-collaps ">
                  <td>{items.mdata}</td>
                  <td className="ps-10 border-l-2">{items.mdata2}</td>
                  <td className="ps-10 border-l-2">{items.mdata3}</td>
                  <td className="border-l-2">{items.mdata4}</td>
                </tr>
                <tr>
                  <td>{items.tdata}</td>
                  <td className="ps-10 border-l-2">{items.tdata2}</td>
                  <td className="ps-10 border-l-2">{items.tdata3}</td>
                  <td className="ps-10 border-l-2">{items.tdata4}</td>
                </tr>
              </tbody>
            </table>
          </dl>
          <h1 className="text-primary font-bold text-3xl my-5">
            {items.heading2}
          </h1>
          <dl>
            <li>{items.in7}</li>
            <li>{items.in7_1}</li>
            <li>{items.in7_2}</li>
            <li>{items.in7_3}</li>
            <li>{items.in7_4}</li>
            <li>{items.in8}</li>
            <li>{items.in9}</li>
            <li>{items.in10}</li>
            <li>{items.in11}</li>
          </dl>

          <h1 className="text-primary font-bold text-3xl my-5">
            {items.heading3}
          </h1>
          <dl>
            <li>{items.in12}</li>

            <li>{items.in13}</li>
            <li>{items.in14}</li>
            <li>{items.in15}</li>
            <li>{items.in16}</li>
          </dl>
          <NavLink
            to="/Testinstruction2"
            className="bg-primary  flex justify-center text-center font-bold text-white w-20 p-2 rounded-md mt-3 mb-2"
          >
            Next
          </NavLink>
        </div>
      ))}
    </>
  );
};

export default Testinstruction;
