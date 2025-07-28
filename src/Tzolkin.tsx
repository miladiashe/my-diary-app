import { type FC } from "react";

// -- fixed start vars --
// We start using a fixed date, in this case 21/12/2012
const StartValues = [
  21, // 0) day
  12, // 1) month
  2012, // 2) year
  207, // 3) kin(260)
  3, // 4) color(4)
  12, // 5) tone(13)
  7, // 6) seal(20)
  112, // 7) year(#nr)
];

function mktime(year: number, month: number, day: number) {
  return new Date(year, month - 1, day).getTime();
}

const colorKOR = ["붉은", "하얀", "푸른", "노란"];
const sealKOR = [
  "용",
  "바람",
  "밤",
  "씨앗",
  "뱀",
  "세계의 중개자",
  "손",
  "별",
  "달",
  "개",
  "원숭이",
  "사람",
  "하늘을 걷는 사람",
  "마법사",
  "독수리",
  "전사",
  "지구",
  "거울",
  "폭풍",
  "태양",
];
const wavespellKOR = [
  "붉은 용",
  "하얀 마법사",
  "푸른 손",
  "노란 태양",
  "붉은 하늘을 걷는 사람",
  "하얀 세계의 중개자",
  "푸른 폭풍",
  "노란 사람",
  "붉은 뱀",
  "하얀 거울",
  "푸른 원숭이",
  "노란 씨앗",
  "붉은 지구",
  "하얀 개",
  "푸른 밤",
  "노란 전사",
  "붉은 달",
  "하얀 바람",
  "푸른 독수리",
  "노란 별",
];
const monD = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

// --- KIN Calculation ---
// THE function that calculates color, tone, seal & kin.
function getTzolkinInfo(d: Date) {
  const day = d.getDate();
  const month = 1 + d.getMonth();
  const year = d.getUTCFullYear();

  // [1] Copy the start values into a new array
  const Ret = StartValues.slice(0, StartValues.length + 1);
  // [2] Create a timestamp from the fixed date
  const fix_tm = mktime(Ret[2], Ret[1], Ret[0]);
  // [3] Create a timestamp from the input date
  const now_tm = mktime(year, month, day);
  // [4] Loop to get the month & year #nr
  if (fix_tm > now_tm) {
    // Get the year#nr in the past.
    while (Ret[2] != year) {
      Ret[2]--;
      // minus 105 each loop.
      Ret[7] -= 105;
      // if lower than 1, plus 260
      if (Ret[7] < 1) {
        Ret[7] += 260;
      }
    }
    // Get the month#nr in the past.
    while (Ret[1] != month) {
      Ret[1]--;
      if (Ret[1] < 1) {
        Ret[1] += 12;
      }
    }
  } else if (now_tm > fix_tm) {
    // Get the year#nr in the future.
    while (Ret[2] != year) {
      Ret[2]++;
      // add 105 each loop.
      Ret[7] += 105;
      // if higher than 260, minus 260
      if (Ret[7] > 260) {
        Ret[7] -= 260;
      }
    }
    // Get the month#nr in the future.
    while (Ret[1] != month) {
      Ret[1]++;
      if (Ret[1] > 12) {
        Ret[1] -= 12;
      }
    }
  }
  // [5] KIN = day#nr + month#nr + year#nr
  Ret[3] = day + monD[Ret[1] - 1] + Ret[7];
  // if higher than 260, minus 260
  while (Ret[3] > 260) {
    Ret[3] -= 260;
  }
  // set "var kin" to fixed kin
  let kin = StartValues[3];
  // [6] Get color, tone & seal
  if (kin > Ret[3]) {
    // -- count down
    while (kin > Ret[3]) {
      kin--;
      // color-1 (if lower than 1, add 4)
      Ret[4]--;
      if (Ret[4] < 1) {
        Ret[4] += 4;
      }
      // tone-1 (if lower than 1, add 13)
      Ret[5]--;
      if (Ret[5] < 1) {
        Ret[5] += 13;
      }
      // seal-1 (if lower than 1, add 20)
      Ret[6]--;
      if (Ret[6] < 1) {
        Ret[6] += 20;
      }
    }
  } else {
    // -- count up
    while (kin < Ret[3]) {
      kin++;
      // color+1 (if higher than 4, min 4)
      Ret[4]++;
      if (Ret[4] > 4) {
        Ret[4] -= 4;
      }
      // tone+1 (if higher than 13, min 13)
      Ret[5]++;
      if (Ret[5] > 13) {
        Ret[5] -= 13;
      }
      // seal+1 (if higher than 20, min 20)
      Ret[6]++;
      if (Ret[6] > 20) {
        Ret[6] -= 20;
      }
    }
  }

  const waveSpell = Math.ceil(Ret[3] / 13);

  const castle = Math.ceil(Ret[3] / 52);
  // [7] Array "Ret" has now all info...
  // Ret = (day,month,year,kin,color,tone,seal,year)
  return {
    kin: Ret[3],
    color: Ret[4],
    tone: Ret[5],
    seal: Ret[6],
    waveSpell: waveSpell,
    castle: castle,
  }; // -- Return Array [Ret]
}

//   -->  Check out this source for more details!  ------
//   ----------------------------------------------------
//   -- for more info contact tGWdb via myTzolkin.com ---
// source from https://tzolkin.be/dl/app/js_tzolkin.htm

const Tzolkin: FC<{ date: Date }> = ({ date }) => {
  const result = getTzolkinInfo(date);

  return (
    <>
      <div>마야력</div>
      <div>
        오늘의 kin number는 {result.kin}
        <br />제 {result.castle}의 성<br />
        오늘의 문양은 {colorKOR[result.color - 1]} {sealKOR[result.seal - 1]},{" "}
        {wavespellKOR[result.waveSpell - 1]}
        <br />
        은하의 소리 {result.tone}
      </div>
    </>
  );
};

export default Tzolkin;
