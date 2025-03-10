# Non-Ergodic Coin Game

Interactive simulation showing a paradox that applies to markets and life: even when the average outcome is positive, most individuals can still lose over time.

Players bet on coin flips where winning gives +50% and losing takes -40% of their current capital. This seemingly favorable setup (positive expected value) hides a brutal truth: most players eventually go broke.

You can adjust win/loss percentages, number of players, and other parameters to explore how different conditions affect outcomes.

![Non-Ergodic Coin Game](preview.jpg)

## Game

Online interactive [simulation](https://solopov.dev/non-ergodic-coin-game) shows a game where players start with the same capital and bet on coin flips. Each round, players either gain or lose a percentage of their capital. The simulation visualizes how player capital evolves over time and compares theoretical versus actual results.

## Features

- Interactive coin-flipping simulation
- Real-time visualization of wealth trajectories
- Comparison between ensemble averages and individual outcomes
- Customizable parameters to explore different scenarios
- Statistical analysis of simulation results

### Key Concepts

- **Ensemble Average**: Average capital of all players at a specific time.
- **Time Average**: Average capital of a single player over time.
- **Ergodicity**: When time and ensemble averages coincide.

## Develop

Clone the repo, navigate to the directory, install dependencies, and start the development server:

```bash
# Clone the repository
git clone git@github.com:petersolopov/non-ergodic-coin-game.git
cd non-ergodic-coin-game
# Install dependencies
npm install
# Start development server
npm run dev
```

Building for Production:

```bash
npm run build
```

## License

MIT License. See [LICENSE](LICENSE) for details.

## Inspired

- [Article of Ole Peters](https://www.nature.com/articles/s41567-019-0732-0) on ergodicity economics and the mathematics of non-ergodic processes.
- Nassim Taleb who frequently discusses the concept of non-ergodicity in his books, particularly in "Skin in the Game"
- Maxim Dorofeev who provides accessible explanations of such concepts in his popular science works.
