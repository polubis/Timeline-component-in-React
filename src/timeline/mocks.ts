import { addDays } from "date-fns";
import {
  DataGroupModel,
  DataGroupModelKey,
  DataGroupModelValue,
} from "./models";

const AVATAR =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80";

const generate = (
  length: number,
  config: {
    top?: (i: number) => boolean;
    expanded?: (i: number) => boolean;
    empty?: (i: number) => boolean;
    ghosty?: (i: number) => boolean;
  }
): DataGroupModel => {
  return Array.from({ length }).map((_, i) => [
    {
      date: addDays(new Date(), i + 1),
      top: config.top ? config.top(i) : undefined,
      expanded: config.expanded ? config.expanded(i) : undefined,
      empty: config.empty ? config.empty(i) : undefined,
      ghosty: config.ghosty ? config.ghosty(i) : undefined,
    } as DataGroupModelKey,
    Array.from(
      { length: i % 3 },
      (_, j) =>
        ({
          avatar: AVATAR,
          title: `This is title with idx: ${j}`,
        } as DataGroupModelValue)
    ),
  ]);
};

export const DATA_SETS = {
  BIG: {
    label: "A lot of data",
    data: generate(50, {
      top: (i) => i % 4 === 0,
      expanded: (i) => i % 4 === 0 || i === 49 || i === 7,
      empty: (i) => i % 10 === 0,
      ghosty: (i) => i % 5 === 0,
    }),
  },
  SMALL: {
    label: "Small amount of data",
    data: generate(20, {
      top: (i) => i % 4 === 0,
      expanded: (i) => i % 4 === 0 || i % 5 === 0,
    }),
  },
  BOTTOM_ONLY: {
    label: "Data visible on bottom only",
    data: [
      [{ date: new Date(), top: true, expanded: true }, []],
      [
        { date: addDays(new Date(), 5), expanded: true },
        [
          { avatar: AVATAR, title: "TDD in React ddd" },
          { avatar: AVATAR, title: "TDD in React ddd" },
          { avatar: AVATAR, title: "TDD in React ddd" },
        ],
      ],
    ] as DataGroupModel,
  },
  TOP_ONLY: {
    label: "Data visible on top only",
    data: [
      [
        { date: new Date(), top: true, expanded: true },
        [
          { avatar: AVATAR, title: "TDD in React ddd" },
          { avatar: AVATAR, title: "TDD in React ddd" },
          { avatar: AVATAR, title: "TDD in React ddd" },
          { avatar: AVATAR, title: "TDD in React ddd" },
        ],
      ],
      [{ date: addDays(new Date(), 5), top: false }, []],
    ] as DataGroupModel,
  },
  EMPTY: {
    label: "Any data available",
    data: [] as DataGroupModel,
  },
};

export type DataSetsKeys = keyof typeof DATA_SETS;
