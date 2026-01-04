// app/data/testData.ts

export interface Item {
  id: number;
  name: string;
  priority: string;
  status: string;
  createdDate: Date;
  updatedDate: Date;
}

export const testData: Item[] = [
  { id: 1, name: "Todoリスト", priority: "中", status: "Active", createdDate: new Date("2025/12/20"), updatedDate: new Date("2025/12/29") }
];
