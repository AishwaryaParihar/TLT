import React from "react";
import Headings from "../utiliti/heading/Heading";

const refundPolicyPoints = [
  "Refunds are only allowed within 3 days of enrollment. A 100% refund (after deducting GST and payment gateway charges) will be paid to the candidate. Refund requests will not be processed after 3 days of enrollment. No refund requests shall be made with respect to the Tests & Course modules.",
  "When you enroll in any course on The Law Tales, you agree to our Privacy Policy, Terms of Use, and Refund Policy.",
  "The Law Tales reserves the right to prepone/postpone/cancel a Batch/class, or an event, for any reason whatsoever, in or beyond its control. In that case, refund is paid. However, logistics or any personal expense incurred by learners/participants is not refunded.",
  "Note: All refunds will be processed within 30 working days after the refund request is approved.",
];

const ReturnAndRefund = () => {
  return (
    <div className="px-5 md:px-20 mb-10">
      <div className="bg-white rounded-lg">
        <Headings
          heading={"h2"}
          style={"text-center font-bold text-4xl text-black mt-5 mb-3"}
        >
          Refund <span className="text-primary">Policy</span>
        </Headings>
        <div className="pt-1 text-md leading-relaxed">
          We at The Law Tales always aim at identifying the issue and helping
          you fix it. However, if the issue still persists, email us your
          concerns & course details from your registered email ID to{" "}
          <a
            href="mailto:support@thelawtales.in"
            className="text-blue-500 underline"
          >
            support@thelawtales.in
          </a>
          . Our team will connect with you.
        </div>

        <h1 className="font-bold text-2xl sm:pt-6 pt-6">
          Our refund policy is:
        </h1>

        <ul className="text-md mt-4 space-y-4">
          {refundPolicyPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <i className="fas fa-arrow-right text-primary mr-2 mt-2"></i>
              {point}
            </li>
          ))}
        </ul>

        <Headings
          heading={"h2"}
          style={"text-center font-bold text-4xl text-primary sm:pt-4 pt-8"}
        >
          Return <span className="text-black">Policy</span>
        </Headings>
        <h1 className="font-bold text-2xl sm:pt-6 pt-6">
          No refund after Delivery of the product:
        </h1>
        <p className="sm:pt-1 pt-4 text-md leading-relaxed">
          The delivery of our product will be made within 2 days of the payment.
          The delivery will be done through online mode via Whatsapp/Telegram in
          PDF format hence no refund will be made once delivery.
        </p>
      </div>
    </div>
  );
};

export default ReturnAndRefund;
