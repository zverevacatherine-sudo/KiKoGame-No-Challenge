# KiKoGame – No Challenge – Study Flow Version

This version includes the Prolific study flow requested for the No-Challenge condition.

## Flow

1. **Pre Study** is the only active step on the start screen.
2. Pre Study contains:
   - 3 AI questions
   - 1 attention check
3. Participant fails the Pre Study if:
   - all 3 AI questions are wrong, **or**
   - the attention check is wrong.
4. If passed, **Assessment rules** become available.
5. Rules use **Ru1.png through Ru12.png**.
6. After the rules are completed, **Start** becomes available.
7. Departments appear after **4 seconds**.
8. Department 3 contains an additional attention check.
   - It does **not** count toward the AI-literacy score.
   - A wrong answer immediately ends participation.
9. Failed screening/attention check screen shows Prolific code:
   - `C1F917Z4`
10. Successful completion still shows Mission completed + score.
11. A new button opens:
   - `https://qualtricsxmbx6typpy4.qualtrics.com/jfe/form/SV_0w8HiouRlacVJH0`

## Files changed / added

- `start_screen.js`
- `study_screens.js` **NEW**
- `quiz.js`
- `main.js`
- `scores.js`
- `events.js`
- `sound.js`
- `index.html`

## Important assets

Rules folder must contain:

- `PICS/Rules/Rules/Ru1.png`
- ...
- `PICS/Rules/Rules/Ru12.png`

Department click audio must be:

- `PICS/Music/Sound_82750500 1634320431.mp3`

The No-Challenge mechanics remain unchanged:
no asteroids/comets, no healing keys, no 3-life system.
