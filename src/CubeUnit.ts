import { Matrix3, Vector3, Color, MeshBasicMaterial, BoxGeometry, Mesh } from "three";

type FaceColor = 'yel' | 'ora' | 'blu' | 'red' | 'gre' | 'whi' | 'blk'
export type CubePosition = {
    x: -1 | 0 | 1
    y: -1 | 0 | 1
    z: -1 | 0 | 1
}


export class CubeCell {
    constructor(l: FaceColor, r: FaceColor, u: FaceColor, d: FaceColor, f: FaceColor, b: FaceColor, coord: CubePosition) {
        this.color_B = b
        this.color_D = d
        this.color_F = f
        this.color_L = l
        this.color_R = r
        this.color_U = u
        this.coordinate = coord
        this.x_clock.set(1, 0, 0, 0, 0, 1, 0, -1, 0)
        this.x_rever.set(1, 0, 0, 0, 0, -1, 0, 1, 0)
        this.y_clock.set(0, 0, -1, 0, 1, 0, 1, 0, 0)
        this.y_rever.set(0, 0, 1, 0, 1, 0, -1, 0, 0)
        this.z_clock.set(0, 1, 0, -1, 0, 0, 0, 0, 1)
        this.z_rever.set(0, -1, 0, 1, 0, 0, 0, 0, 1)
    }
    private color_L: FaceColor
    private color_R: FaceColor
    private color_U: FaceColor
    private color_D: FaceColor
    private color_F: FaceColor
    private color_B: FaceColor
    private coordinate: CubePosition

    private x_clock = new Matrix3();
    private x_rever = new Matrix3();
    private y_clock = new Matrix3();
    private y_rever = new Matrix3();
    private z_clock = new Matrix3();
    private z_rever = new Matrix3();

    getColors() {
        return [this.color_L, this.color_R, this.color_U, this.color_D, this.color_F, this.color_B]
    }

    getCoordinate() {
        return this.coordinate
    }

    applyRotation(matrix: Matrix3) {
        let vec = new Vector3()
        vec.set(this.coordinate.x, this.coordinate.y, this.coordinate.z)
        vec.applyMatrix3(matrix)
    }

    getMesh() {
        //let cube = new Mesh(geometry, [mt_blue, mt_green, mt_orange, mt_red, mt_white, mt_yellow]);
        let geo = new BoxGeometry(1, 1, 1);
        let cube = new Mesh(geo, [
            this.getMaterial(this.color_R),
            this.getMaterial(this.color_L),
            this.getMaterial(this.color_U),
            this.getMaterial(this.color_D),
            this.getMaterial(this.color_F),
            this.getMaterial(this.color_B)
        ])
        return cube
    }

    private getMaterial(clr: FaceColor) {
        if (clr == 'blk') {
            return new MeshBasicMaterial({ color: new Color(0, 0, 0) })
        }
        if (clr == 'blu') {
            return new MeshBasicMaterial({ color: new Color(0, 0, 1) })
        }
        if (clr == 'gre') {
            return new MeshBasicMaterial({ color: new Color(0, 1, 0) })
        }
        if (clr == 'ora') {
            return new MeshBasicMaterial({ color: new Color(1, 0.6, 0) })
        }
        if (clr == 'red') {
            return new MeshBasicMaterial({ color: new Color(1, 0, 0) })
        }
        if (clr == 'whi') {
            return new MeshBasicMaterial({ color: new Color(1, 1, 1) })
        }
        if (clr == 'yel') {
            return new MeshBasicMaterial({ color: new Color(1, 1, 0) })
        }
        return new MeshBasicMaterial({ color: new Color(0, 0, 0) })
    }
}