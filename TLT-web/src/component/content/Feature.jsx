import React from 'react';
import Headings from '../utiliti/heading/Heading';
import stylees from './Feature.module.css';
import studentf from '../../assets/feature/fri2.avif';
import Soft from '../../assets/feature/softss.avif';
import solo from '../../assets/feature/solo.png';
import learning from '../../assets/feature/learning.png';
import study from '../../assets/feature/soft.png';
import mock from '../../assets/feature/exam.avif';

const facalitydata = [
  {
    fimg: solo,
    fname: 'Solo Faculty',
    fdescription:
      "Our emerging coaching academy prides itself on offering personalized attention and expert guidance with a sole faculty member. This ensures consistency and a deep understanding of each student's progress and needs.",
  },
  {
    fimg: learning,
    fname: 'Interactive Learning',
    fdescription:
      'We offer engaging sessions to enhance understanding of complex legal concepts, staying at the forefront of educational trends with innovative learning methods.Our curriculum includes interactive sessions & online resources, providing students with a dynamic learning environment.',
  },

  {
    fimg: studentf,
    fname: 'Student Friendly Ecosystem',
    fdescription:
      'Our academy fosters a supportive & inclusive environment where students feel comfortable & motivated to excel. We prioritize student satisfaction & strive to create a nurturing ecosystem conducive to learning & growth.',
  },

  {
    fimg: study,
    fname: 'Updated & Hand-Picked Study Material',
    fdescription:
      "We understand the significance of quality study material in shaping a student's success.Therefore, we hand-pick study resources tailored to meet the demands of judiciary examinations.",
  },
  {
    fimg: mock,
    fname: 'Mock Tests & Performance Analysis',
    fdescription:
      'Practice is key to success in judiciary exams. At TLT Judicial Academy, we emphasize regular mock tests and performance evaluations so students can assess progress, identify improvement areas, and refine their preparation.',
  },
  {
    fimg: Soft,
    fname: 'Soft Skill Development',
    fdescription:
      'where students engage in rigorous academic discourse, learn from one another, & collectively strive towards excellence.It underscores the importance of holistic development, encompassing not only legal acumen but also communication skills, emotional intelligence, and resilience in the face of challenges.',
  },
];
const Feature = () => {
  return (
    <>
      <div className="mt-16">
        <div className="py-5 mx-5 md:mx-20 lg:mb-10 mb-5">
          <Headings heading={'h6'} style={'text-shadow'}>
            Let's make your dream into reality
          </Headings>
          <Headings heading={'h2'} style={'text-shadow'}>
            Our Best <span className="text-primary">Features</span>
          </Headings>
        </div>
        <div className="flex justify-center items-center  flex-wrap lg:gap-20 gap-8  pb-16 ">
          {facalitydata.map((items, index) => (
            <div key={index} className={stylees.card}>
              <img className={stylees.imgbox} src={items.fimg} />
              <div className={stylees.content}>
                <div className={stylees.description}>
                  <Headings heading={'h5'}>{items.fname}</Headings>
                </div>

                <div className={stylees.info}>{items.fdescription}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feature;
