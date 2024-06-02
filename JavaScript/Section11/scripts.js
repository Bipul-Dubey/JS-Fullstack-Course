// array
// ===================== array methods ===============
const a = [1, 2, 3, 4];
console.log(typeof a, Array.isArray(a));

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// mutate = change original data
// slice == doesnot change original array, and return new array
let sliced;
sliced = arr.slice(3); // first 3 element removed
sliced = arr.slice(3, 4); // return element from mth index to nth-1 index , m>n
sliced = arr.slice(-3); // return last 3 index element
sliced = arr.slice(1, -2); // return element from index m to length-n
console.log("sliced", sliced);
console.log("original array", arr);
// splice == does change original array
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr2.splice(1);
console.log(arr2);
// reverse == return reverse array, change original array
// concat == multiple array in single array
// join == join array element to string based on given char

const arr3 = [1, 2, 3, 4, 5];
console.log("access element by []:", arr3[3]);
console.log("access element by at mehtod:", arr3.at(3));

// []  and at work same, there is some benefit of at is chainnig and access indexes
console.log(arr3.at(-1));

console.log("==================LOOPING==================");
// forEach
// map
// filter
// reduce

// ==================== challenge 1 =================
const julia1 = [3, 5, 2, 12, 7];
const julia2 = [9, 16, 6, 8, 3];

const kate1 = [4, 1, 15, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

const filterDogs = (list1 = [], list2 = []) => {
  const dogList1 = list1.slice(1, -2);
  const dogList2 = list2.slice(1, -2);
  const dogs = [...dogList1, ...dogList2];
  dogs.forEach((dog, idx) => {
    if (dog < 3) {
      console.log(`Dog number ${idx + 1} is still a puppy`);
    } else {
      console.log(`Dog number ${idx + 1} is an adult, and is ${dog} year old`);
    }
  });
};

filterDogs(julia1, kate1);

// =============  map, filter, reduce =============
// map - loop over array, return a new array, take a callback function
// filter - loop over array, and return that data which satisfied given condition
// reduce - reduce the all array elements down to one single value (e.g. adding all element together)
