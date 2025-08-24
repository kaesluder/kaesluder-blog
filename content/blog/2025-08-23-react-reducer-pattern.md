---js
const title = '23 August 2025: React Reducer Pattern';
const date = "2025-08-23";
const draft = false;
const tags = ["javascript", "react"];
const mermaid = true;
---

Some of my "side" project work includes prototyping with strategies that I'd like to apply at work. We have moderately complex, legacy Vue and React interfaces that are difficult to test for a variety of reasons. One of my maintenance tasks is look for ways to refactor for testability, and some of the themes for React are:

1. Division of application state into multiple `useState()` variables.
2. Internal React variables are not directly observable without rendering. This makes it difficult to test "business" (data modification) logic separate from UI rendering logic.
3. Multiple UI events can trigger state changes.
4. Tacit updates and component lifecycle events trigger unexpected results and errors.

The reducer pattern helps to address many of these problems.

[ttrpg-tools](https://github.com/kaesluder/ttrpg-tools) is a side project to create a set of creative brainstorming oracles for [solo role-playing games](https://www.tabletopgaming.co.uk/features/a-beginners-guide-to-solo-tabletop-rpgs/). Many of these games include a mechanic that increases the risk of negative events as play continues. Examples include jenga towers and playing card layouts.

My experimental mechanic uses solitaire blackjack with the addition of a "resource" pile of cards that can be played at any time. The "dealer" represents a hostile environment, and players will need to balance wins and losses to reach the endgame. My first attempt at managing game state through React's `useState` came out something of a mess, which pushed me to read more about `useReducer` as an alternative.

{% mermaid %}

erDiagram

		direction LR
		state ||--|| view : configures
		state {
			Card[] playerHand
			Card[] dealerHand
			Card[] resources
			Card[] discardPile
			number playerScore
			number dealerScore
		}

		view ||--|{ actions : sends
		view {
			ul playerHand
			ul dealerHand
			ul resources
			div playerScore
			div dealerScore
			nav turnNav
		}

		actions }|--|| reducer : direct
		actions {
			action setupRound
			action playerTurn
			action playerHit
			action playerStand
			action dealerTurn
			action scoreRound
		}

		reducer ||--|| state : updates
		reducer {
			param state
			param action
			returns state
		}
{% endmermaid %}

Currently the game code consists of four main components, each with their own responsibilities:

- **The Game State**: This is a class that manages the deck of cards, and multiple arrays representing a draw pile, player hand, dealer hand, and discard pile. It also contains functions for updating the total score, and calculating the score for each hand. This bundles almost all of the app state.
- **The View**: A set of JSX components that is primarily responsible for displaying the current game state as a list of rendered cards and numbers. It also includes an action bar that displays only the actions relevant to each stage, and has minimal event handlers to create *actions* for the *reducer*.
- **Actions**: Each action is a simple message object that represents a single game events a high level. These are sent to the *reducer* via a *dispatch* function. A simple action is:

```typescript
{type: 'SETUP_ROUND'}
```
- **The Reducer**: The *reducer* is a pure function (not triggering or depending on side effects) that takes the current *game state* and an *action*. It reads the action, calls the appropriate methods on the *game state*, and generates the next *game state*. It uses [immer](https://immerjs.github.io/immer/) to ensure that the new state is an immutable copy.

The reducer is simply an extended switch statement. Here's a minimal example

```typescript
/**
 * Create a reducer function using drawPile as the array iterator.
 * @param {ArrayIterator<Card>} drawPile
 * @returns {(SurvivalBlackjack, ReducerAction) => SurvivalBlackjack} reducer function
 */
export function makeReducer(
  drawPile: ArrayIterator<Card>, // shuffled deck for game
): (state: SurvivalBlackjack, action: ReducerAction) => SurvivalBlackjack {

	// The reducer starts here as a closure.
  return function reducer(state: SurvivalBlackjack, action: ReducerAction) {
    switch (action.type) {
      // start the game drawing resources
      case turnStage.start: // turnStage is a typescript enum
        return produce(state, (state) => { // immer.produce() ensures immutability
          state = state.setup(drawPile).setStage(turnStage.start);
        });
...
```

`drawPile` is an iterator object with its own internal state. I keep it separate from `state` to ensure that `state` can be immutably handled by both React and immer without complications. This is 'passed' into the reducer via a closure. The reducer and initial game state are created early and added to the view with the following line of code:

```typescript
const [game, dispatch] = useReducer(reducer, initialGame);
```

This is parallel to `[state, setState] = useState(initialState)` State properties can be accessed through `game.current` for rendering. The view does not directly modify the state, which makes handling events very simple:

```typescript
<button onClick={() => dispatch({ type: sb.turnStage.playerTurn })}>
  Start Game
</button>
```

`dispatch` calls the *reducer*, captures the new game state, and triggers a redraw. The *reducer* takes care of round and game management. The *state* methods take care of game mechanics. Some of the advantages include:

1. MVC organization.
2. Game management, game mechanics, and display logic can be tested independently.
3. Direct access to state properties for testing.
4. Game management and game mechanics are not dependent on any UI framework.
5. Interdependent states can be managed together, without worrying about the rendering cycle.
