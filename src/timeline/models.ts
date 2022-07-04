export interface DataGroupModelKey {
  date: Date;
  top?: boolean;
  expanded?: boolean;
  ghosty?: boolean;
  empty?: boolean;
}

export interface DataGroupModelValue {
  avatar: string;
  title: string;
}

export type DataGroupModel = [DataGroupModelKey, DataGroupModelValue[]][];

export interface TimelineProps {
  padding?: string;
  scale?: number;
  data: DataGroupModel;
  onItemClick: (key: DataGroupModelKey, item: DataGroupModelValue) => void;
}
