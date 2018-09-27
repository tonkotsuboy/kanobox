// Optional Chaining
const data = {
  user: {
    address: {
      street: "福岡県"
    }
  }
};

console.log(data.user?.address?.street);  // 福岡県
console.log(data.user?.hoge?.street);  // undefined

// Nullish coalescing
console.log(undefined ?? "NO DATA");  // NO DATA
console.log("猫" ?? "NO DATA");  // "猫"

const foo = num => Math.floor(num * 1.1);
const bar = num => `${num}円`;

const result = 100
  |> foo
  |> bar;

console.log(result);