declare type TagHandler = {
    current: () => number;
    next: () => number;
};
export declare const createTagHandler: () => TagHandler;
export {};
