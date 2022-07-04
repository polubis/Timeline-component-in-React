import { format } from "date-fns";
import { Fragment } from "react";
import { TimelineProps } from "./models";
import css from "./Timeline.module.scss";

export const Timeline = ({
  padding = "22px 36px 22px 36px",
  scale = 1,
  data,
  onItemClick,
}: TimelineProps) => {
  const sortedData = data.sort((prev, curr) => {
    if (prev[0].date > curr[0].date) {
      return 1;
    }

    if (prev[0].date === curr[0].date) {
      return 0;
    }

    return -1;
  });

  const itemHeight = 50 * scale;
  const markerSize = 24 * scale;
  const markersGap = 32 * scale;
  const itemsGap = 12 * scale;
  const groupPadding = 48 * scale;
  const lineXHeight = 4 * scale;
  const lineYWidth = 2 * scale;
  const itemWidth = 206 * scale;
  const lineXContainerHeight = markerSize;

  const { topItemsCount, bottomItemsCount } = sortedData.reduce(
    (acc, [{ top }, items]) => {
      const itemsLength = items.length;

      if (top) {
        acc.topItemsCount =
          itemsLength > acc.topItemsCount ? itemsLength : acc.topItemsCount;
      } else {
        acc.bottomItemsCount =
          itemsLength > acc.bottomItemsCount
            ? itemsLength
            : acc.bottomItemsCount;
      }

      return acc;
    },
    { topItemsCount: 0, bottomItemsCount: 0 }
  );

  const getContentHeight = () => {
    let total = lineXContainerHeight;

    if (topItemsCount > 0) {
      total += markerSize;
      total += groupPadding * 2;
      total += itemHeight * topItemsCount;
      total += itemsGap * (topItemsCount - 1);
    }

    if (bottomItemsCount > 0) {
      total += markerSize;
      total += groupPadding * 2;
      total += itemHeight * bottomItemsCount;
      total += itemsGap * (bottomItemsCount - 1);
    }

    return total;
  };

  const contentHeight = getContentHeight();

  const getLineXOffsetTop = () => {
    if (topItemsCount === 0) {
      return 0;
    }

    return (
      markerSize +
      groupPadding * 2 +
      itemHeight * topItemsCount +
      itemsGap * (topItemsCount - 1)
    );
  };

  const lineXContainerTop = getLineXOffsetTop();
  let lineXWidth = data.length * markerSize + (data.length - 1) * markersGap;

  if (lineXWidth < 0) {
    lineXWidth = 0;
  }

  return (
    <div className={css.container} style={{ padding }}>
      <div className={css.content} style={{ height: contentHeight }}>
        <div
          className={css.lineXContainer}
          style={{
            height: lineXContainerHeight,
            transform: `translate(0px, ${lineXContainerTop}px)`,
            width: lineXWidth,
          }}
        >
          <div className={css.lineX} style={{ height: lineXHeight }} />

          {sortedData.map(([key, items], groupIdx) => {
            const { date, top, expanded, ghosty, empty } = key;
            const left = groupIdx * (markersGap + markerSize);
            const style = {
              height: markerSize,
              width: markerSize,
              borderWidth: lineYWidth,
            };
            const lineYHeight =
              groupPadding * 2 +
              itemHeight * items.length +
              itemsGap * (items.length - 1);
            const lineYOffset = lineYHeight / 2 + markerSize / 2;

            return (
              <Fragment key={date.toDateString()}>
                {ghosty || (
                  <div
                    className={`${css.marker} ${css.midMarker}`}
                    style={{
                      ...style,
                      transform: `translate(${left}px)`,
                    }}
                  />
                )}

                {items.length > 0 && expanded && !ghosty && (
                  <>
                    <div
                      className={css.lineY}
                      style={{
                        width: lineYWidth,
                        transform: `translate(${
                          left + markerSize / 2 - lineYWidth / 2
                        }px, ${top ? "-" : ""}${lineYOffset}px`,
                        height: lineYHeight,
                      }}
                    />

                    <div
                      className={`${css.marker} ${css.endMarker}`}
                      style={{
                        ...style,
                        transform: `translate(${left}px, ${
                          top
                            ? `-${lineYHeight + markerSize}px`
                            : `${lineYHeight + markerSize}px`
                        })`,
                      }}
                    >
                      {empty || (
                        <span
                          style={{
                            paddingLeft: `${
                              markerSize / 2 + itemHeight / 2 + markerSize / 2
                            }px`,
                          }}
                        >
                          {format(date, "dd/mm/yyyy")}
                        </span>
                      )}
                    </div>

                    {items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={css.item}
                        onClick={() => onItemClick(key, item)}
                        style={{
                          height: itemHeight,
                          width: itemWidth,
                          transform: `translate(${
                            groupIdx * (markersGap + markerSize) -
                            markerSize / 2
                          }px, ${
                            top
                              ? `-${
                                  groupPadding +
                                  itemHeight +
                                  itemHeight * itemIdx +
                                  itemsGap * itemIdx
                                }px`
                              : `${
                                  groupPadding +
                                  itemHeight +
                                  itemHeight * itemIdx +
                                  itemsGap * itemIdx
                                }px`
                          })`,
                          ...(top ? { top: 0 } : { bottom: 0 }),
                        }}
                      >
                        <img src={item.avatar} alt="Timeline avatar" />
                        {empty || (
                          <span style={{ marginLeft: markerSize / 2 + "px" }}>
                            {item.title}
                          </span>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
