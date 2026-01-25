// app/data/testData.ts

export interface ItemList {
  id: number;
  project_name: string;
  creation_level: string;
  status: string;
  used_technologies: string[];
  created_date: Date;
  updated_date: Date;
}

export interface ItemUserStory {
  id: number;
  user_story_name: string;
  item_list_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ItemTask {
  id: number;
  task_name: string;
  description?: string;
  user_story_id: number;
  created_at: Date;
  updated_at: Date;
}

export const itemList: ItemList[] = [
  { id: 1, project_name: "Todoリスト", creation_level: "中", status: "Active", used_technologies: ["React", "TypeScript"], created_date: new Date("2025/12/20"), updated_date: new Date("2025/12/29") }
];

export const itemUserStory: ItemUserStory[] = [
  { id: 1, user_story_name: "フロントエンド開発", item_list_id: 1, created_at: new Date("2025/12/21"), updated_at: new Date("2025/12/30") }
];

export const itemTask: ItemTask[] = [
  { id: 1, task_name: "検索バー", description: "検索バーの実装", user_story_id: 1, created_at: new Date("2025/12/22"), updated_at: new Date("2025/12/31") }
];