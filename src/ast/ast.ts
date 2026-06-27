type NodeType =
    | "Program"
    | "ExprStmt"
    | "NumericLiteral"
    | "NullLiteral"
    | "Identifier"
    | "BinaryExpr"

export interface AstNode {
    kind: NodeType;
}

export interface Stmt extends AstNode { }

export interface ExprStmt extends Stmt {
    kind: "ExprStmt";
    expression: Expr;
}

export interface Program extends Stmt {
    kind: "Program"
    body: ExprStmt[];
}

export interface Expr extends AstNode { };

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number;
}

export interface NullLiteral extends Expr {
    kind: "NullLiteral";
    value: string;
}

export interface Identifier extends Expr {
    kind: "Identifier";
    value: string;
}

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr";
    left: Expr;
    right: Expr;
    operator: string;
}