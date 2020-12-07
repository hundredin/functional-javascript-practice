const curry = f => (a, ...args) =>
  args.length ?
    f(a, ...args) :
    (...args) => f(a, ...args);


const L = {};
L.map = curry(function* (f, iterable) {
  for (const a of iterable) {
    yield f(a);
  }
})

L.filter = curry(function* (f, iterable) {
  for (const a of iterable) {
    if (f(a)) yield a;
  }
})


L.take = curry(function* (l, iterable) {
  for (const a of iterable) {
    yield a;
    if (--l == 0) break;
  }
});

L.takeUntil = function* (f, iterable) {
  for (const a of iterable) {
    yield a;
    if (f(a)) break;
  }
};

L.range = function* (start, end, step = 1) {
  while(start < end) {
    yield start;
    start+=step;
  }
}

// const reduce = function (f, acc, iterable) {
//   for (const a of iterable) {
//     acc = f(acc, a)
//   }
//   return acc
// }

const reduce = curry(function(f, acc, iter) {
  if (arguments.length === 2) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc;
})

const go = (a, ...fs) => {
  return reduce((acc, f) => f(acc), a, fs)
}
const pipe = (...fs) => (a) => go(a, ...fs);

console.log(go(1,
  a => a + 2,
  a => a * 10,
  a => a - 5
))

const func1 = pipe(
  a => a + 2,
  a => a * 10,
  a => a - 5
)

console.log(func1(1));

// const curry = f => a => b => f(a, b);


// const add = curry((a, b) => a + b)
// const addTen = add(10, );
// console.log(addTen(10));
// console.log(add(10)(10));


// reduce((acc, a) => acc + a, 0,
//     take(3, 
//       map(a => a*a, 
//         filter(a => a % 2, [1,2,3,4,5,6,7,8])
//       )
//     )
//   )

console.log(go([1,2,3,4,5,6,7,8],
  L.filter(a => a%2),
  L.map(a => a*a),
  L.take(3),
  reduce((acc, a) => acc + a)
))

const isIterable = (iter) => Boolean(iter && iter[Symbol.iterator])
L.flat = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) {
        yield b;
      }
    } else {
      yield a;
    }
  }
}
console.log([...L.flat([[1, 2, 3], [4, 5], [6, 7]])]);

const add = (acc, a) => acc += a

const users = [
  { name: 'a', age: 21, family: [
    { name: 'a1', age: 53 }, { name: 'a2', age: 47 },
    { name: 'a3', age: 16 }, { name: 'a4', age: 14 }
  ] },
  { name: 'b', age: 24, family: [
    { name: 'b1', age: 58 }, { name: 'b2', age: 51 },
    { name: 'b3', age: 10 }, { name: 'b4', age: 22 }
  ] },
  { name: 'c', age: 31, family: [
    { name: 'c1', age: 64 }, { name: 'c2', age: 62 }
  ] },
  { name: 'd', age: 20, family: [
    { name: 'd1', age: 42 }, { name: 'd2', age: 42 },
    { name: 'd3', age: 11 }, { name: 'd4', age: 7 }
  ] }
];

go(users,
  L.map(u => u.family),
  L.flat,
  L.filter(u => u.age < 20),
  L.map(u => u.age),
  reduce(add),
  console.log
);