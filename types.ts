export interface Tool {
    name : string,
    draw : (context : CanvasRenderingContext2D, startX : number, startY  : number, endX : number, endY : number) => void,
    draggable : boolean,
}

export interface DrawEventData {
    toolName : string,
    startX : number,
    startY : number,
    endX : number,
    endY : number,
    color : string
}

export type DrawEventCallback = (eventData : DrawEventData) => void