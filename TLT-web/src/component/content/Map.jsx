import React from 'react';

const Map = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.267339080095!2d77.43151827483048!3d23.233356808430212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43f8bc4fdb2d%3A0x51835b46888a0acb!2sThe%20Law%20Tales!5e0!3m2!1sen!2sin!4v1720597014969!5m2!1sen!2sin"
        width="100%"
        height="500px"
        style={{ border: 0 }} // Use double curly braces for inline styles in JSX
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
