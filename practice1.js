// const map = function(f, iter) {
//   const result = [];
//   for (const a of iter) {
//     result.push(f(a))
//   }
//   return result;
// }

// console.log(map(a => a * 2, [1,2,3,4]));

// const filter = function(f, iter) {
//   const result = [];
//   for (const a of iter) {
//     if (f(a)) result.push(a)
//   }
//   return result;
// }

// console.log(filter(a => a % 2, [1,2,3,4,5,6]));

const map = function* (f, iter) {
  for (const a of iter) {
    yield f(a)
  }
}

const filter = function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
}

// console.log([...map(a => a * 2, [1,2,3,4])]);
// console.log([...filter(a => a % 2, [1,2,3,4,5,6])]);

const take = function* (len, iter) {
  for (const a of iter) {
    yield a;
    --len;
    if (len == 0) break;
  }
}
console.log([...take(3, [1,2,3,4,5,6])])
const takeUntil = function* (f, iter) {
  for (const a of iter) {
    yield a;
    if (f(a)) break;
  }
}

console.log([...takeUntil(a => a === 5, [1,2,3,4,5,6])])

// const range = function(start, end, step = 1) {
//   const result = [];
//   while(start < end) {
//     result.push(start);
//     start+=step;
//   }
//   return result;
// }

const range = function* (start, end, step = 1) {
  while(start < end) {
    yield start;
    start+=step;
  }
}

// console.log([...range(1, Infinity, 2)])

console.log([...take(3, range(1, Infinity))])


function f1(limit, arr) {
  let acc = 0;
  for (let a of arr) {
    if (a % 2) {
      a = a * a;
      acc = acc + a;
      if (--limit == 0) break;
    }
  }
  console.log(acc)
}

f1(3, [1,2,3,4,5,6,7,8])

const reduce = function (f, acc, iterable) {
  for (const a of iterable) {
    acc = f(acc, a)
  }
  return acc
}

console.log(reduce((acc, a) => acc + a, 0, [1,2,3,4,5]));

console.log(
  reduce((acc, a) => acc + a, 0,
    take(3, 
      map(a => a*a, 
        filter(a => a % 2, [1,2,3,4,5,6,7,8])
      )
    )
  )
)
