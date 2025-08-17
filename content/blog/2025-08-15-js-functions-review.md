---js
const title = '16 August 2025: Reviewing JS Functions';
const date = "2025-08-16";
const draft = false;
const tags = ["javascript"];
const mermaid = false;
---

## Functions Review

I'm reviewing basic function and scope rules to help in working with some legacy code. I have my own style but I'm maintaining code that's written in a different style. See the [Google Typescript Style Guide section on `this`](https://google.github.io/styleguide/tsguide.html#features-this) for a suggestion to avoid using `this` and `arguments`.

### Function Creation

Function Declaration is traditional. `this` is bound to parent object (`Window` in browser). Name is immediately available.

```javascript
function add(a, b) {
	return a + b;
}
```

Function Expression: `function` defined but not directly declared with a name. Can only be used as an expression, typically assigned to something else. Similar to a `lambda`. `this` bound to context of invocation.

```javascript
const add = function(a, b) {
	return a + b;
}
```

Arrow Functions: Concise lambda functions. No declared name. `this` bound to nearest ancestor at time of definition.

```javascript
const add = (a, b) => a + b
```

Class Methods: Functions created as part of a class. `this` is bound to the created object.

```javascript
class adder {
	add(a,b) {
		return a + b;
	}
}
```

### Function Calling

The way functions are called can influence the behavior of the function by changing the context.

- Function as function: `add(1, 1)` Standard way of calling functions. Returns `return` value. `this` comes from context parent.
- Function as constructor: `obj = new adder()` Creates a new class instance. Implicitly returns new object *unless `return` statement uses a different Object instance.*  `this` is new instance.
- Function as object method: `adder.add(1,1)` Returns `return` value. `this` defaults to instance.
- `Function.prototype.bind(context)` Creates a bound function in which `this` is bound to the specified context. Can also bind additional variables for currying.
- Call and apply: `add.call(context, a, b)` and `add.apply(context, [a, b])`. Calls function with bound context and arguments.

## Takeaways

- Explicitly define context outside of instance methods.
- Avoid ambiguity, avoid `this` outside of instance methods.
- Use bind or closures when moving a function to a different context.
