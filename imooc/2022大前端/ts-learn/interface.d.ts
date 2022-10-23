interface publicPoint {
    x: number | string;
    y: number;
    z: number;
}
interface Point extends publicPoint {
    a?: number;
}
interface Point1 extends publicPoint, Point2 {
    a: string;
    b: string;
}
interface Point2 {
    d: number;
}
declare const myPoint: Point;
declare const myPoint1: Point1;
interface Func {
    (num1: number, num2: number): number;
}
declare const addFunc: Func;
interface Role {
    [id: number]: string;
}
declare const role: Role;
declare const role1: Role;
interface MyType {
    color: string;
}
declare const getTypes: ({ color }: MyType) => string;
declare const option: {
    color: string;
    size: number;
};
