import { AppValues } from "../shared/data";

export interface CheckListItem {
    id?: number;
    description: string;
    completed: boolean;
}

export interface TaskItem {
    id?: number;
    title: string;
    description?: string;
    completed: boolean;
    checkListType: boolean;
    checkList?: CheckListItem[];
    tagId: number;
    dueDate: string;
    createdAt?: string;
}

export interface NoteItem {
    id?: number;
    title?: string;
    description: string;
    tagId: number;
    // checkListType: boolean;
    // checkList?: CheckListItem[];
    createdAt: string;
}

export interface TagItem {
    id?: number;
    title: string;
    description?: string;
    color: string;
}

export interface AccountData {
    id?: number;
    name: string;
    about?: string;
    profilePhoto?: string;
    themeId?: number;
}

/**CONTENTS */
export type FormType = AppValues.create | AppValues.edit;
