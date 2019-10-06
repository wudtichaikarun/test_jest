// Course ref: https://www.udemy.com/course/the-complete-nodejs-developer-course-2/learn/lecture/13729456#overview
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Number mus be no-negative");
      }
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  const sum = await add(1, -99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, -3);
  return sum3;
};

export default {
  add,
  doWork
};
