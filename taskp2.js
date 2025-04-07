//#region imports
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.name = 'scene_myworld';
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);
camera.position.set(0, 0, 500);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
const origin = new THREE.Vector2(0, 0);
//#endregion

//#region Helper Function
function pointsIdentification(x, y, z) {
    const ch = new THREE.SphereGeometry(1)
    const chmat = new THREE.MeshBasicMaterial({ color: 'blue' })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(x, y, z);
    scene.add(chmesh)
}

//#endregion

//#region  function - 1
function fun1() {
    const height = 2,
        width = 2;
    const shape = new THREE.Shape();
    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x + width, origin.y);
    shape.lineTo(origin.x + width, origin.y + height);
    shape.lineTo(origin.x + width + width, origin.y + height);
    shape.lineTo(origin.x + width + width, origin.y + height + height);
    shape.lineTo(origin.x + width, origin.y + height + height);
    shape.lineTo(origin.x + width, origin.y + height + height + height);
    shape.lineTo(origin.x, origin.y + height + height + height);
    shape.lineTo(origin.x, origin.y + height + height);
    shape.lineTo(origin.x - width, origin.y + height + height);
    shape.lineTo(origin.x - width, origin.y + height);
    shape.lineTo(origin.x, origin.y + height);
    shape.lineTo(origin.x, origin.y);

    const extrudeSettings = {
        bevelEnabled: false,
        steps: 1,
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 0, 0),
        ]),
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({
        color: "#ff0000",
        wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const vertices = [];
    const positionAttribute = geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);
        vertices.push([x, y, z]);
    }

    const uniqueVertices = [
        ...new Set(vertices.map((v) => JSON.stringify(v))),
    ].map((v) => JSON.parse(v));

    console.log(uniqueVertices);
}
//#endregion

//#region  function - 2
function fun2() {
    camera.position.set(0, 0, 200);
    const points = [];
    function addPoint(x, y) {
        points.push(new THREE.Vector3(x, y, 0));
    }
    const shape = new THREE.Shape();
    shape.moveTo(25, 25);
    addPoint(25, 25);
    shape.bezierCurveTo(25, 25, 20, 0, 0, 0);
    addPoint(20, 0);
    addPoint(0, 0);

    shape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    addPoint(-30, 0);
    addPoint(-30, 35);

    shape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    addPoint(-30, 55);
    addPoint(-10, 77);
    addPoint(25, 95);

    shape.bezierCurveTo(60, 77, 80, 55, 80, 35);
    addPoint(60, 77);
    addPoint(80, 55);
    addPoint(80, 35);

    shape.bezierCurveTo(80, 35, 80, 0, 50, 0);
    addPoint(80, 0);
    addPoint(50, 0);

    shape.bezierCurveTo(35, 0, 25, 25, 25, 25);
    addPoint(35, 0);
    addPoint(25, 25);

    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 1 });
    const material = new THREE.MeshBasicMaterial({
        color: "#ff0000",
        wireframe: false,

    });
    const mesh = new THREE.Mesh(geometry, material);
    //   scene.add(mesh);

    const vertexMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
    points.forEach((point) => {
        const vertexGeometry = new THREE.SphereGeometry(1, 16, 16);
        const vertexMesh = new THREE.Mesh(vertexGeometry, vertexMaterial);
        vertexMesh.position.set(point.x, point.y, 0);
        // scene.add(vertexMesh);
    });

    const heart2 = new THREE.Shape();
    heart2.moveTo(0, 0);
    heart2.lineTo(-15, -25);
    heart2.lineTo(-30, -30);
    heart2.lineTo(-50, -25);
    heart2.lineTo(-60, 0);
    heart2.lineTo(-50, 25);
    heart2.lineTo(-30, 50);
    heart2.lineTo(-5, 70);
    heart2.lineTo(0, 75);


    const extrudeSettings = {
        depth: 10,
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 0, 0),
        ]),
    }

    const hgeometry = new THREE.ExtrudeGeometry(heart2, extrudeSettings);
    const hmaterial = new THREE.MeshBasicMaterial({ color: "#ff0000", wireframe: false });
    const hmesh = new THREE.Mesh(hgeometry, hmaterial);
    hmesh.rotateY(-Math.PI / 2)
    scene.add(hmesh);
}
//#endregion

//#region  function - 3
function fun3() {
    const shape = new THREE.Shape();
    const vertices = [];
    function addPoints(v) {
        vertices.push(new THREE.Vector3(v[0], v[1], 0));
    }
    shape.moveTo(5, -3);
    shape.bezierCurveTo(5, -3, 5, -3, 5, -3);
    shape.bezierCurveTo(5, -3, 4.5, -4.5, 4.5, -4.5);
    shape.bezierCurveTo(4.5, -4.5, 3, -5, 3, -5);
    shape.bezierCurveTo(3, -5, 2, -5, 2, -5);
    shape.bezierCurveTo(2, -5, 1, -4, 1, -4);
    shape.bezierCurveTo(1, -4, -1, -2, -1, -2);
    shape.bezierCurveTo(-1, -2, -2, -2, -2, -2);
    shape.bezierCurveTo(-2, -2, -3, -3, -3, -3);
    shape.bezierCurveTo(-3, -3, -3.5, -4, -3.5, -4);
    shape.bezierCurveTo(-3.5, -4, -5, -4, -5, -4);
    shape.bezierCurveTo(-5, -4, -6, -3, -6, -3);
    shape.bezierCurveTo(-6, -3, -6, -1, -6, -1);
    shape.bezierCurveTo(-6, -1, -5, 0, -5, 0);
    shape.bezierCurveTo(-5, 0, -4, 0, -4, 0);
    shape.bezierCurveTo(-4, 0, -3, 0, -3, 0);
    shape.bezierCurveTo(-3, 0, -2, 1, -2, 1);
    shape.bezierCurveTo(-2, 1, -2, 2, -2, 2);
    shape.bezierCurveTo(-2, 2, -3, 2.5, -3, 2.5);
    shape.bezierCurveTo(-3, 2.5, -5, 2.5, -5, 2.5);
    shape.bezierCurveTo(-5, 2.5, -6, 2, -6, 2);
    shape.bezierCurveTo(-6, 2, -7, 2.5, -7, 2.5);
    shape.bezierCurveTo(-7, 2.5, -7.5, 3.5, -7.5, 3.5);
    shape.bezierCurveTo(-7.5, 3.5, -7, 4.5, -7, 4.5);
    shape.bezierCurveTo(-7, 4.5, -6, 5, -6, 5);
    shape.bezierCurveTo(-6, 5, -5, 5, -5, 5);
    shape.bezierCurveTo(-5, 5, -4, 5, -4, 5);
    shape.bezierCurveTo(-4, 5, -3, 4.5, -3, 4.5);
    shape.bezierCurveTo(-3, 4.5, -2, 3.5, -2, 3.5);
    shape.bezierCurveTo(-2, 3.5, -1, 3.5, -1, 3.5);
    shape.bezierCurveTo(-1, 3.5, 0, 4.5, 0, 4.5);
    shape.bezierCurveTo(0, 4.5, 1, 5, 1, 5);
    shape.bezierCurveTo(1, 5, 2, 6, 2, 6);
    shape.bezierCurveTo(2, 6, 3, 6, 3, 6);
    shape.bezierCurveTo(3, 6, 4, 6, 4, 6);
    shape.bezierCurveTo(4, 6, 5, 5, 5, 5);
    shape.bezierCurveTo(5, 5, 5, 4, 5, 4);
    shape.bezierCurveTo(5, 4, 4.5, 3.5, 4.5, 3.5);
    shape.bezierCurveTo(4.5, 3.5, 4, 3, 4, 3);
    shape.bezierCurveTo(4, 3, 3, 3, 3, 3);
    shape.bezierCurveTo(3, 3, 2, 3, 2, 3);
    shape.bezierCurveTo(2, 3, 1.5, 2, 1.5, 2);
    shape.bezierCurveTo(1.5, 2, 2.5, 1, 2.5, 1);
    shape.bezierCurveTo(2.5, 1, 3.5, 0, 3.5, 0);
    shape.bezierCurveTo(3.5, 0, 3.5, -1, 3.5, -1);
    shape.bezierCurveTo(3.5, -1, 4.5, -2, 4.5, -2);


    addPoints([5, -3]);
    addPoints([4.5, -4.5]);
    addPoints([3, -5]);
    addPoints([2, -5]);
    addPoints([1, -4]);
    // addPoints([-1, -2]);
    // addPoints([-2, -2]);
    // addPoints([-3, -3]);
    // addPoints([-3.5, -4]);
    // addPoints([-5, -4]);
    // addPoints([-6, -3]);
    // addPoints([-6, -1]);
    // addPoints([-5, 0]);
    // addPoints([-4, 0]);
    // addPoints([-3, 0]);
    // addPoints([-2, 1]);
    // addPoints([-2, 2]);
    // addPoints([-3, 2.5]);
    // addPoints([-5, 2.5]);
    // addPoints([-6, 2]);
    // addPoints([-7, 2.5]);
    // addPoints([-7.5, 3.5]);
    // addPoints([-7, 4.5]);
    // addPoints([-6, 5]);
    // addPoints([-5, 5]);
    // addPoints([-4, 5]);
    // addPoints([-3, 4.5]);
    // addPoints([-2, 3.5]);
    // addPoints([-1, 3.5]);
    // addPoints([0, 4.5]);
    // addPoints([1, 5]);
    // addPoints([2, 6]);
    // addPoints([3, 6]);
    // addPoints([4, 6]);
    // addPoints([5, 5]);
    // addPoints([5, 4]);
    // addPoints([4.5, 3.5]);
    // addPoints([4, 3]);
    // addPoints([3, 3]);
    // addPoints([2, 3]);
    // addPoints([1.5, 2]);
    // addPoints([2.5, 1]);
    // addPoints([3.5, 0]);
    // addPoints([3.5, -1]);
    // addPoints([4.5, -2]);

    const extrudeSetting = {
        depth: 1,
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 1)
        ])
    }

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue' })
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    // console.log(vertices);

    vertices.forEach((v) => {
        const vertexGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const vertexMat = new THREE.MeshBasicMaterial({ color: 'red' });
        const vertexMesh = new THREE.Mesh(vertexGeo, vertexMat);
        vertexMesh.position.set(v.x, v.y, v.z);
        // scene.add(vertexMesh);
    });

    const edgeo = new THREE.EdgesGeometry(geo);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    scene.add(edges);
}
//#endregion

//#region  function - 4
function fun4() {
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    // const circle = new THREE.CircleGeometry(2);
    // Create a shape for the circle
    const shape = new THREE.Shape();
    const radius = 2;
    const segments = 32;
    const angleStep = (Math.PI * 2) / segments;

    for (let i = 0; i <= segments; i++) {
        const theta = i * angleStep;
        shape.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
    }
    const extrudeSettings = {
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -5),
            // new THREE.Vector3(0, 5, 0)
        ])
    };
    const extrude = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    const extrudeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    const extrudeMesh = new THREE.Mesh(extrude, extrudeMaterial);
    scene.add(extrudeMesh);

}
//#endregion

//#region  function - 5
function fun5() {

    let helper = new THREE.GridHelper();
    helper.rotation.x = Math.PI * 0.5;
    scene.add(helper);

    function extrudePath(points, depth) {
        let geometry = new THREE.PlaneGeometry(0, 0, points.length - 1, 1);
        let pos = geometry.attributes.position;

        for (let i = 0, l = points.length, p; i < l; i++) {
            let p = points[i];
            pos.setXYZ(i, p.x, p.y, p.z + depth);
            pos.setXYZ(i + points.length, p.x, p.y, p.z)
        }

        geometry.computeVertexNormals();
        return geometry;
    }

    const pCount = 11;
    let controlPts = new Array(pCount).fill().map((p, idx) => {
        return new THREE.Vector3(-(pCount - 1) * 0.5 + idx, (Math.random() - 0.5) * 2, Math.random());
    });

    let curve = new THREE.CatmullRomCurve3(controlPts);
    let pts = curve.getSpacedPoints(100);

    let g = extrudePath(pts, 1);
    let m = new THREE.MeshBasicMaterial({ color: "aqua", wireframe: true });
    let o = new THREE.Mesh(g, m);
    scene.add(o);

}
//#endregion

//#region  function - 6
function fun6() {
    const shape = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);
    const height = 300;
    var width = 100, diameter = 10;

    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x, origin.y + height);
    shape.quadraticCurveTo(origin.x, origin.y + height + height / 12, origin.x - width * 3.5 / 15, origin.y + height + height / 23);
    shape.lineTo(origin.x - width, origin.y + height - height / 10);
    shape.lineTo(origin.x - width, origin.y + height - height / 10 - height / 5);
    shape.lineTo(origin.x - width * 2 / 5 - 6, origin.y + height + height / 10 - (1.35 * height / 4));
    shape.quadraticCurveTo(origin.x - width * 2 / 5 - 2, origin.y + height + height / 10 - (1.35 * height / 4), origin.x - width * 2 / 5, origin.y + height + height / 10 - (1.4 * height / 4));
    shape.lineTo(origin.x - width * 2 / 5, origin.y);
    shape.quadraticCurveTo(origin.x - width / 5, origin.y - width / 5, origin.x, origin.y);
    var radius = diameter / 2;
    if (radius > height / 8 || radius < 0 || radius > width / 2.5) {
        radius = Math.min(height / 8, width / 2.5 - 3, height / 10);
    }
    width = Math.max(width, 20);
    const hole = new THREE.Path();
    hole.absarc(origin.x - width * 2 / 5 - 6, origin.y + height + height / 10 - (1.3 * height / 4) + height / 10, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const extrudeSetting = {
        depth: 1,
    }
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false })
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const edgeo = new THREE.EdgesGeometry(geo);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    mesh.add(edges);
}

//#endregion

//#region  function - 7
function fun7() {

    const vertices = [];
    function addPoints(v) {
        vertices.push(new THREE.Vector3(v[0], v[1], 0));
    }
    const origin = new THREE.Vector2(0, 0);
    const height = 100, width = 50;
    var radius = 20;

    const startAngle = 0;
    const endAngle = Math.PI / 2;
    console.log(startAngle, endAngle);

    const shape = new THREE.Shape();
    shape.moveTo(origin.x, origin.y);

    // shape.bezierCurveTo(origin.x, origin.y, origin.x, origin.y + height / 2, origin.x, origin.y + height );
    shape.absarc(origin.x, origin.y, radius, startAngle, endAngle, false);
    shape.lineTo()
    // shape.lineTo(origin.x, origin.y + height)
    // shape.quadraticCurveTo(origin.x - 20, origin.y + height + 10, origin.x - 40, origin.y + height);
    // shape.lineTo(origin.x , origin.y );
    // shape.bezierCurveTo( origin.x, origin.y + height, origin.x, origin.y + height, origin.x - width / 5, origin.y + height + 3);
    // shape.bezierCurveTo(origin.x - width / 5, origin.y + height + 3, origin.x - width * 2 / 5, origin.y + height + 3, origin.x - width, origin.y + height - height / 10);
    // shape.bezierCurveTo(origin.x - width, origin.y + height - height / 10, origin.x - width, origin.y + height - height / 10 - height / 4, origin.x - width * 2 / 5, origin.y + height + height / 10 - height / 4);
    // shape.bezierCurveTo(origin.x - width * 2 / 5, origin.y + height + height / 10 - height / 4, origin.x - width * 2 / 5, origin.y, origin.x, origin.y);

    const extrudeSetting = {
        depth: 1,
    }

    // const geo  = new THREE.ShapeGeometry(shape);
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true })
    const mesh = new THREE.Mesh(geo, mat);
    // mesh.rotateY( - Math.PI / 2)
    scene.add(mesh);

    const axesHelper = new THREE.AxesHelper(40);
    scene.add(axesHelper);

    let ch = 10;
    ch = 12;
    console.log(ch);

    var c = 100;
    var c = 102;
    console.log(c);

    function che() {
        let ch = 50;
        console.log(ch, c);
    }
    che();


    // const len = vertices.length;
    // console.log(getX(vertices[len - 1])  ,  vertices[0]);
    // addPoints([(vertices[0][0] - vertices[len - 1][0]) / 2, origin.y - height / 20]);

    const vertexGeo = new THREE.SphereGeometry(1);
    const vertexMat = new THREE.MeshBasicMaterial({ color: 'red' });
    const vertexMesh = new THREE.Mesh(vertexGeo, vertexMat);
    vertexMesh.position.set(origin.x - 20, origin.y + height + 10);
    scene.add(vertexMesh);
    //         hole.absarc(x, y, radius, 0, Math.PI * 2);
    //         shape.holes.push(hole);

}
//#endregion

//#region  function - 8
function fun8() {

    const shape = new THREE.Shape();
    const origin = { x: 0, y: 0 };
    const width = 10;
    const height = 20;

    const points = [
        new THREE.Vector2(origin.x, origin.y),
        new THREE.Vector2(origin.x, origin.y + height),
        // new THREE.Vector2(origin.x - width / 5 , origin.y + height + 3),
        new THREE.Vector2(origin.x - width / 5 + 1, origin.y + height + 3.5),
        new THREE.Vector2(origin.x - width * 2 / 5, origin.y + height + 3),
        new THREE.Vector2(origin.x - width * 2 / 5, origin.y + height + 3),
        // new THREE.Vector2(origin.x - width , origin.y + height - height / 10),
        new THREE.Vector2(origin.x - width + 1, origin.y + height - height / 10),
        new THREE.Vector2(origin.x - width + 1, origin.y + height - height / 10 - height / 4),
        new THREE.Vector2(origin.x - width * 2 / 5, origin.y + height + height / 10 - (1.3 * height / 4)),
        new THREE.Vector2(origin.x - width * 2 / 5, origin.y),
        new THREE.Vector2(origin.x - width / 5 + 1, origin.y - 2),
        new THREE.Vector2(origin.x, origin.y)
    ];

    const splineCurve = new THREE.SplineCurve(points);

    const splinePoints = splineCurve.getPoints(900);

    shape.moveTo(splinePoints[0].x, splinePoints[0].y);

    for (let i = 1; i < splinePoints.length; i++) {
        shape.lineTo(splinePoints[i].x, splinePoints[i].y);
    }

    shape.lineTo(splinePoints[0].x, splinePoints[0].y);

    const extrudeSettings = {
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 3)
        ])
    };
    const extrude = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const extrudeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    const extrudeMesh = new THREE.Mesh(extrude, extrudeMaterial);
    extrudeMesh.rotateZ(Math.PI / 2);
    scene.add(extrudeMesh);

    const edgeo = new THREE.EdgesGeometry(extrude);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    extrudeMesh.add(edges);

}

//#endregion

//#region  function - 9
function fun9() {
    const shape = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);
    let width = 100, height = 100;
    let diameter = 8, depth = 10;

    if (diameter > depth) {
        diameter = depth;
    }
    width = Math.max(width, 90)
    height = Math.max(height, 60)
    depth /= 2;
    shape.moveTo(origin.x + 5, origin.y);
    shape.lineTo(origin.x + width - 5, origin.y);
    shape.quadraticCurveTo(origin.x + width, origin.y, origin.x + width, origin.y + 7);
    shape.lineTo(origin.x + width, origin.y + height / 3)
    shape.absarc(origin.x + width - depth, origin.y + height / 3, depth, 0, Math.PI, false);
    shape.lineTo(origin.x + width - depth - depth, origin.y + depth + depth + 5)
    shape.quadraticCurveTo(origin.x + width - depth - depth, origin.y + depth + depth, origin.x + width - depth - depth - 5, origin.y + depth + depth);
    shape.lineTo(origin.x + depth + depth + 5, origin.y + depth + depth);
    shape.quadraticCurveTo(origin.x + depth + depth, origin.y + depth + depth, origin.x + depth + depth, origin.y + depth * 2 + 5)
    shape.lineTo(origin.x + depth + depth, origin.y + height - depth - 20);
    shape.quadraticCurveTo(origin.x + depth + depth, origin.y + height - depth - 10, origin.x + depth + depth + 5, origin.y + height - depth - 5);
    shape.quadraticCurveTo((origin.x + depth * 5 + width / 2) / 2 - 5, origin.y + height + 10, origin.x + depth + depth + width / 2 - 5, origin.y + height - depth);
    shape.quadraticCurveTo(origin.x + depth + depth + width / 2, origin.y + height - depth - 5, origin.x + depth + depth + width / 2, origin.y + height - depth - 10)
    shape.lineTo(origin.x + depth + depth + width / 2, origin.y + height - depth - height / 6)
    shape.absarc(origin.x + depth + width / 2 + depth + depth, origin.y + height - depth - height / 6, depth, 0, Math.PI, true)  // circle 2 
    shape.lineTo(origin.x + depth + depth + width / 2 + depth + depth, origin.y + height - depth - height / 6)
    shape.lineTo(origin.x + depth + depth + width / 2 + depth + depth, origin.y + height + depth - 10)
    shape.quadraticCurveTo(origin.x + depth + depth + width / 2 + depth + depth, origin.y + height + depth, origin.x + depth + depth + width / 2 + depth + depth - 5, origin.y + height + depth + 5)
    shape.quadraticCurveTo((origin.x + depth * 5 + width / 2) / 2 - 5, origin.y + height + depth * 2 + 20, origin.x + 5, origin.y + height + depth + 5);
    shape.quadraticCurveTo(origin.x, origin.y + height + depth, origin.x, origin.y + height + depth - 10);
    shape.lineTo(origin.x, origin.y + height - depth);
    shape.lineTo(origin.x, origin.y + 5);
    shape.quadraticCurveTo(origin.x, origin.y, origin.x + 3, origin.y);
    const extrudeSetting = {
        depth: 10,
    }
    const radius = diameter / 2;
    const hole1 = new THREE.Path();
    hole1.absarc(origin.x + width - depth, origin.y + height / 3 - 5, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(origin.x + depth + depth + width / 2 + depth, origin.y + height - height / 9, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole2);

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false })
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const edgeo = new THREE.EdgesGeometry(geo);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    mesh.add(edges);

    // shape.quadraticCurveTo(origin.x + depth + depth, origin.y + height - depth - 10, origin.x + depth + depth + 5, origin.y + height - depth - 5);
    // shape.quadraticCurveTo((origin.x + depth * 5 + width / 2) / 2 - 5, origin.y + height + 10, origin.x + depth + depth + width / 2 - 5, origin.y + height - depth);
    // shape.quadraticCurveTo(origin.x + depth + depth + width / 2, origin.y + height - depth - 5, origin.x + depth + depth + width / 2, origin.y + height - depth - 10)


    const ch = new THREE.SphereGeometry(3)
    const chmat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
    const chmesh = new THREE.Mesh(ch, chmat);
    // chmesh.position.set(origin.x, origin.y + height - depth);
    // chmesh.position.set(origin.x + depth + depth, origin.y + height - depth - 10);
    // scene.add(chmesh)
}
//#endregion

//#region function - 10 
function fun10() {
    const radius = 10, depth = 35, height = 300, width = 300;
    const origin = new THREE.Vector2(0, 0);
    let shape = new THREE.Shape();

    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x, origin.y + height)
    shape.absarc(origin.x + width / 4, origin.y + height - depth, width / 4, Math.PI, 0, true);
    shape.absarc(origin.x + width / 2 - depth / 2, origin.y + height - depth, depth / 2, 0, Math.PI, true);
    shape.absarc(origin.x + width / 4, origin.y + height - depth, width / 4 - depth, 0, Math.PI, false);
    shape.moveTo(origin.x + depth, origin.y + height - depth);
    shape.lineTo(origin.x + depth, origin.y + depth)
    shape.lineTo(origin.x + width - depth, origin.y + depth)
    shape.lineTo(origin.x + width - depth, origin.y + depth + height / 3)
    shape.absarc(origin.x + width - depth / 2, origin.y + depth + height / 3, depth / 2, Math.PI, 0, true);
    shape.lineTo(origin.x + width, origin.y)
    shape.lineTo(origin.x, origin.y);

    const hole1 = new THREE.Path();
    hole1.absarc(origin.x + width / 2 - depth / 2, origin.y + height - depth + 5, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(origin.x + width - depth / 2, origin.y + depth + height / 3 - 5, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole2);

    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0, bevelEnabled: false });
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
    const ch = new THREE.SphereGeometry(2)
    const chmat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(origin.x + width - depth / 2, origin.y + depth + height / 3 - 5);
    // chmesh.position.set(origin.x + width - depth / 2, origin.y  + height / 3);
    // scene.add(chmesh)


}
//#endregion

//#region Function - 11
function fun11() {


    const spotLight = new THREE.SpotLight(0x00ff00, 1000);
    spotLight.position.set(0, 4, 0);
    scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    const planeSize = 400;
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        // side: THREE.DoubleSide,
        wireframe: false
    });
    const mesh1 = new THREE.Mesh(planeGeo, planeMat);
    mesh1.rotation.x = Math.PI * - .5;
    mesh1.position.set(0, -50, 0)
    scene.add(mesh1);


    const shape = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);


    let height = 400, width = 500, depth = 57, diameter = 10;
    if (diameter > depth) {
        diameter = depth
    }
    if (height < depth) {
        height = depth + 10
    }

    // Desire Shape formation
    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x, origin.y + height - depth - 10);
    shape.quadraticCurveTo(origin.x, origin.y + height - depth, origin.x - 10, origin.y + height - depth)
    shape.lineTo(origin.x - width, origin.y + height - depth);
    shape.absarc(origin.x - width - depth / 2, origin.y + height - depth, depth / 2, 0, Math.PI, true);
    shape.absarc(origin.x - width - depth, origin.y + height - depth + depth / 2, depth / 2, 3 * (Math.PI) / 2, Math.PI / 2, true);
    shape.absarc(origin.x - width - depth / 2, origin.y + height, depth / 2, Math.PI, 0, true);
    shape.lineTo(origin.x + depth - 10, origin.y + height)
    shape.quadraticCurveTo(origin.x + depth, origin.y + height, origin.x + depth, origin.y + height - 10)
    shape.lineTo(origin.x + depth, origin.y)
    shape.absarc(origin.x + depth / 2, origin.y, depth / 2, 0, Math.PI, true)

    // Hole
    const circle = new THREE.Path();
    circle.absarc(origin.x - width - depth / 2, origin.y + height - depth / 2, diameter / 2, 0, Math.PI * 2, true);
    shape.holes.push(circle);

    // Extrude Geometry 
    const extrudeSetting = {
        depth: 50,
    }
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    // const mat = new THREE.MeshBasicMaterial({ color: 'green', wireframe: false })
    const mat = new THREE.MeshNormalMaterial({ color: 'green', wireframe: false })
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Side bala light hai ye 
    const edgeo = new THREE.EdgesGeometry(geo);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    mesh.add(edges);
}
//#endregion

//#region  Function - 12  (dependent)
function fun12() {
    const origin = new THREE.Vector2(0, 0);
    let doorHeight = 200, doorWidth = 120, holeDiameter = 100, handleHeight = 50, handleWidth = 50;

    //  handle height calculation

    if (handleHeight < 20) {
        handleHeight = 20;
    }
    if (handleHeight > doorHeight) {
        handleHeight = doorHeight;
    }
    if (doorWidth < holeDiameter + 20) {
        doorWidth = holeDiameter
    }

    // holeDiameter calculation
    if (holeDiameter + 20 > handleHeight) {
        holeDiameter = handleHeight - 20;
    }

    //  Door  formation
    const doorShape = new THREE.Shape();
    doorShape.moveTo(origin.x, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y)



    let x_handleMove = 0, y_handleMove = 148;

    //  Handle
    let handle = new THREE.Shape();
    // y_handleMove -= (doorHeight - handleHeight) / 2;
    handle.moveTo(origin.x, origin.y + doorHeight - (doorHeight - handleHeight) / 2);
    handle.lineTo(origin.x + holeDiameter + 20, origin.y + doorHeight - (doorHeight - handleHeight) / 2)
    handle.lineTo(origin.x + holeDiameter + 20, origin.y + (doorHeight - handleHeight) / 2)
    handle.lineTo(origin.x - handleWidth, origin.y + (doorHeight - handleHeight) / 2)
    handle.lineTo(origin.x - handleWidth, origin.y + handleHeight + (doorHeight - handleHeight) / 2)
    handle.lineTo(origin.x, origin.y + handleHeight + (doorHeight - handleHeight) / 2)

    //  Door Hole
    const doorHole = new THREE.Path();
    doorHole.absarc(origin.x + 10 + holeDiameter / 2, origin.y + doorHeight / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    doorShape.holes.push(doorHole);


    // Handle Hole
    const HandleHole = new THREE.Path();
    HandleHole.absarc(origin.x + 10 + holeDiameter / 2, origin.y + handleHeight + (doorHeight - handleHeight) / 2 - handleHeight / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    handle.holes.push(HandleHole);


    const deep = 10;
    //  Extrude setting
    const extrudeSetting = {
        depth: deep,
    }

    //  Extrude for door 
    const door = new THREE.ExtrudeGeometry(doorShape, extrudeSetting);
    const doormat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const doorMesh = new THREE.Mesh(door, doormat);
    scene.add(doorMesh);

    //  Extrude for Handle
    const handles = new THREE.ExtrudeGeometry(handle, extrudeSetting);
    const handleMesh = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false, side: THREE.DoubleSide });
    const handlesrMesh = new THREE.Mesh(handles, handleMesh);
    handlesrMesh.position.set(0, 0, deep)
    scene.add(handlesrMesh);


    // Edge line for Door geometry
    const doorEdgeo = new THREE.EdgesGeometry(door);
    const doorEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const doorEdges = new THREE.LineSegments(doorEdgeo, doorEdmat);
    doorMesh.add(doorEdges);

    // Edge line for Handle geometry
    const handleEdgeo = new THREE.EdgesGeometry(handles);
    const handleEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const handleEdges = new THREE.LineSegments(handleEdgeo, handleEdmat);
    handleEdges.position.set(0, 0, deep)
    doorMesh.add(handleEdges);

}
//#endregion

//#region  Function - 13 (independent)
function fun13() {
    const origin = new THREE.Vector2(0, 0);
    let doorHeight = 400, doorWidth = 500, holeDiameter = 100, handleHeight = 90, handleWidth = 150;

    //  Door  formation
    const doorShape = new THREE.Shape();
    doorShape.moveTo(origin.x, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y)

    //  handle height calculation
    if (handleHeight < 20) {
        handleHeight = 20;
    }
    if (handleHeight > doorHeight) {
        handleHeight = doorHeight;
    }

    // holeDiameter calculation
    if (holeDiameter + 20 > handleHeight) {
        holeDiameter = handleHeight - 20;
    }

    //  Handle
    let handle = new THREE.Shape();
    const originHandle = new THREE.Vector2(0, 0);
    handle.moveTo(originHandle.x, originHandle.y + doorHeight - (doorHeight - handleHeight) / 2);
    handle.lineTo(originHandle.x + holeDiameter + 20, originHandle.y + doorHeight - (doorHeight - handleHeight) / 2)
    handle.lineTo(originHandle.x + holeDiameter + 20, originHandle.y + (doorHeight - handleHeight) / 2)
    handle.lineTo(originHandle.x - handleWidth, originHandle.y + (doorHeight - handleHeight) / 2)
    handle.lineTo(originHandle.x - handleWidth, originHandle.y + handleHeight + (doorHeight - handleHeight) / 2)
    handle.lineTo(originHandle.x, originHandle.y + handleHeight + (doorHeight - handleHeight) / 2)

    //  Door Hole
    const doorHole = new THREE.Path();
    doorHole.absarc(origin.x + 10 + holeDiameter / 2, origin.y + doorHeight / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    doorShape.holes.push(doorHole);


    // Handle Hole
    const HandleHole = new THREE.Path();
    HandleHole.absarc(originHandle.x + 10 + holeDiameter / 2, originHandle.y + handleHeight + (doorHeight - handleHeight) / 2 - handleHeight / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    handle.holes.push(HandleHole);

    const shapeDeep = 40;
    //  Extrude setting
    const extrudeSetting = {
        depth: shapeDeep,
    }

    //  Extrude for door 
    const door = new THREE.ExtrudeGeometry(doorShape, extrudeSetting);
    const doormat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const doorMesh = new THREE.Mesh(door, doormat);
    scene.add(doorMesh);

    //  Extrude for Handle
    const handles = new THREE.ExtrudeGeometry(handle, extrudeSetting);
    const handleMesh = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false, side: THREE.DoubleSide });
    const handlesrMesh = new THREE.Mesh(handles, handleMesh);
    handlesrMesh.position.set(0, 0, shapeDeep)
    scene.add(handlesrMesh);


    // Edge line for Door geometry
    const doorEdgeo = new THREE.EdgesGeometry(door);
    const doorEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const doorEdges = new THREE.LineSegments(doorEdgeo, doorEdmat);
    doorMesh.add(doorEdges);

    // Edge line for Handle geometry
    const handleEdgeo = new THREE.EdgesGeometry(handles);
    const handleEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const handleEdges = new THREE.LineSegments(handleEdgeo, handleEdmat);
    handleEdges.position.set(0, 0, shapeDeep)
    doorMesh.add(handleEdges);

}
//#endregion

//#region Function 14 (Independent)
function fun14() {
    const origin = new THREE.Vector2(0, 0);
    let doorHeight = 200, doorWidth = 300, holeDiameter = 50, handleHeight = 50, handleWidth = 100;

    // Handle height calculation
    if (handleHeight < 20) {
        handleHeight = 20;
    }
    if (handleHeight > doorHeight) {
        handleHeight = doorHeight;
    }
    if (holeDiameter + 20 > handleHeight) {
        holeDiameter = handleHeight - 20;
    }
    doorHeight = Math.max(doorHeight, 2 * holeDiameter + 40)
    // Extrusion 
    const shapeDeep = 1;
    const extrudeSetting = {
        depth: shapeDeep,
    };

    // Door formation
    const doorShape = new THREE.Shape();
    doorShape.moveTo(origin.x, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y);


    const doorHoles = [
        { x: origin.x + holeDiameter / 2 + 5, y: origin.y + doorHeight / 2 },
        { x: origin.x - holeDiameter / 2 - 5 + doorWidth, y: origin.y + doorHeight / 2 },
        { x: origin.x + doorWidth / 2, y: origin.y + holeDiameter - 10 },
        { x: origin.x + doorWidth / 2, y: origin.y + doorHeight - holeDiameter + 10 },
    ];
    doorHoles.forEach(hole => {
        const doorHole = new THREE.Path();
        doorHole.absarc(hole.x, hole.y, holeDiameter / 2, 0, Math.PI * 2, true);
        doorShape.holes.push(doorHole);
    });



    // Door Extrusion
    const door = new THREE.ExtrudeGeometry(doorShape, extrudeSetting);
    const doormat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const doorMesh = new THREE.Mesh(door, doormat);
    scene.add(doorMesh);

    // handle Formaton 
    const originHandle = new THREE.Vector2(0, 0);
    let handle = new THREE.Shape();
    handle.moveTo(originHandle.x, originHandle.y);
    handle.lineTo(originHandle.x + handleHeight / 2, originHandle.y);
    handle.lineTo(originHandle.x + handleHeight / 2, originHandle.y + handleWidth);
    handle.lineTo(originHandle.x - handleHeight / 2, originHandle.y + handleWidth);
    handle.lineTo(originHandle.x - handleHeight / 2, originHandle.y);

    // Handle Hole 
    const HandleHole = new THREE.Path();
    HandleHole.absarc(originHandle.x, originHandle.y + holeDiameter / 2 + 5, holeDiameter / 2, 0, Math.PI * 2, true);
    handle.holes.push(HandleHole);


    //  Handle UP
    const handles = new THREE.ExtrudeGeometry(handle, extrudeSetting);
    const handleMesh = new THREE.MeshBasicMaterial({ color: 0x00ff00ff, wireframe: false, side: THREE.DoubleSide });
    const handlesrMesh = new THREE.Mesh(handles, handleMesh);
    handlesrMesh.position.set(originHandle.x + doorWidth / 2, originHandle.y + doorHeight - holeDiameter - 10, shapeDeep);
    scene.add(handlesrMesh);

    //  Handle DOWN
    const handleDown = handles.clone();
    const handleDownMat = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false, side: THREE.DoubleSide });
    const handleDownMatMesh = new THREE.Mesh(handleDown, handleDownMat);
    handleDownMatMesh.position.set(originHandle.x + doorWidth / 2, originHandle.y + holeDiameter + 10, shapeDeep * 2);
    handleDown.rotateX(Math.PI)
    scene.add(handleDownMatMesh);

    // Handle RIGHT
    const handleRight = handles.clone();
    const handleRightMat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false, side: THREE.DoubleSide });
    const handleRightMatMesh = new THREE.Mesh(handleRight, handleRightMat);
    handleRightMatMesh.position.set(originHandle.x + doorWidth - holeDiameter - 10, originHandle.y + doorHeight / 2, shapeDeep);
    handleRightMatMesh.rotateZ(-Math.PI / 2);
    scene.add(handleRightMatMesh);

    // Handle LEFT  
    const handleLeft = handles.clone();
    const handleLeftMat = new THREE.MeshBasicMaterial({ color: 0xf00f0ff, wireframe: false, side: THREE.DoubleSide });
    const handleLeftMatMesh = new THREE.Mesh(handleLeft, handleLeftMat);
    handleLeftMatMesh.position.set(originHandle.x + holeDiameter + 10, originHandle.y + doorHeight / 2, shapeDeep);
    handleLeftMatMesh.rotateZ(Math.PI / 2);
    scene.add(handleLeftMatMesh);

    // Edge line for handle geometry
    const handleEdmat = new THREE.LineBasicMaterial({ color: 'white' });


    const handleEdgeo = new THREE.EdgesGeometry(handles);
    const handleEdges = new THREE.LineSegments(handleEdgeo, handleEdmat);
    handlesrMesh.add(handleEdges);

    // Edge line Handle Left
    const handleLeftEdge = new THREE.EdgesGeometry(handleLeft);
    const handleLeftEdgeSeg = new THREE.LineSegments(handleLeftEdge, handleEdmat);
    handleLeftMatMesh.add(handleLeftEdgeSeg);

    // // Edge line for clone2 handle geometry
    const handleRightEdge = new THREE.EdgesGeometry(handleRight);
    const handleRightEdgeSeg = new THREE.LineSegments(handleRightEdge, handleEdmat);
    handleRightMatMesh.add(handleRightEdgeSeg);

    // // Edge line for clone3 handle geometry
    const handleDownEdge = new THREE.EdgesGeometry(handleDown);
    const handleDownEdgeSeg = new THREE.LineSegments(handleDownEdge, handleEdmat);
    handleDownMatMesh.add(handleDownEdgeSeg);

    const ch = new THREE.SphereGeometry(2)
    const chmat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(originHandle.x, originHandle.y);
    // scene.add(chmesh)
}
//#endregion

//#region Function 15 (dependent)
function fun15() {
    const origin = new THREE.Vector2(0, 0);
    let doorHeight = 200, doorWidth = 300, holeDiameter = 50, handleHeight = 50, handleWidth = 100;

    // Handle height calculation
    if (handleHeight < 20) {
        handleHeight = 20;
    }
    if (handleHeight > doorHeight) {
        handleHeight = doorHeight;
    }
    if (holeDiameter + 20 > handleHeight) {
        holeDiameter = handleHeight - 20;
    }
    doorHeight = Math.max(doorHeight, 2 * holeDiameter + 40)
    // Extrusion 
    const shapeDeep = 1;
    const extrudeSetting = {
        depth: shapeDeep,
    };

    // Door formation
    const doorShape = new THREE.Shape();
    doorShape.moveTo(origin.x, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y);
    console.log("this for door ", origin.y);


    const doorHoles = [
        { x: origin.x + holeDiameter / 2 + 5, y: origin.y + doorHeight / 2 },
        { x: origin.x - holeDiameter / 2 - 5 + doorWidth, y: origin.y + doorHeight / 2 },
        { x: origin.x + doorWidth / 2, y: origin.y + holeDiameter - 10 },
        { x: origin.x + doorWidth / 2, y: origin.y + doorHeight - holeDiameter + 10 },
    ];
    doorHoles.forEach(hole => {
        const doorHole = new THREE.Path();
        doorHole.absarc(hole.x, hole.y, holeDiameter / 2, 0, Math.PI * 2, true);
        doorShape.holes.push(doorHole);
    });



    // Door Extrusion
    const door = new THREE.ExtrudeGeometry(doorShape, extrudeSetting);
    const doormat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const doorMesh = new THREE.Mesh(door, doormat);
    scene.add(doorMesh);

    // handle Formaton 
    let handle = new THREE.Shape();
    // handle.moveTo(origin.x, origin.y);

    console.log("this for handle ", origin.y);
    handle.lineTo(handleHeight / 2, 0);
    handle.lineTo(handleHeight / 2, handleWidth);
    handle.lineTo(-handleHeight / 2, handleWidth);
    handle.lineTo(- handleHeight / 2, 0);

    // Handle Hole 
    const HandleHole = new THREE.Path();
    HandleHole.absarc(0, 0 + holeDiameter / 2 + 5, holeDiameter / 2, 0, Math.PI * 2, true);
    handle.holes.push(HandleHole);


    //  Handle UP
    const handles = new THREE.ExtrudeGeometry(handle, extrudeSetting);
    const handleMesh = new THREE.MeshBasicMaterial({ color: 0x00ff00ff, wireframe: false, side: THREE.DoubleSide });
    const handlesrMesh = new THREE.Mesh(handles, handleMesh);
    handlesrMesh.position.set(origin.x + doorWidth / 2, origin.y + doorHeight - holeDiameter - 10, shapeDeep);
    scene.add(handlesrMesh);

    //  Handle DOWN
    const handleDown = handles.clone();
    const handleDownMat = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false, side: THREE.DoubleSide });
    const handleDownMatMesh = new THREE.Mesh(handleDown, handleDownMat);
    handleDownMatMesh.position.set(origin.x + doorWidth / 2, origin.y + holeDiameter + 10, shapeDeep * 2);
    handleDown.rotateX(Math.PI)
    scene.add(handleDownMatMesh);

    // Handle RIGHT
    const handleRight = handles.clone();
    const handleRightMat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false, side: THREE.DoubleSide });
    const handleRightMatMesh = new THREE.Mesh(handleRight, handleRightMat);
    handleRightMatMesh.position.set(origin.x + doorWidth - holeDiameter - 10, origin.y + doorHeight / 2, shapeDeep);
    handleRightMatMesh.rotateZ(-Math.PI / 2);
    scene.add(handleRightMatMesh);

    // Handle LEFT  
    const handleLeft = handles.clone();
    const handleLeftMat = new THREE.MeshBasicMaterial({ color: 0xf00f0ff, wireframe: false, side: THREE.DoubleSide });
    const handleLeftMatMesh = new THREE.Mesh(handleLeft, handleLeftMat);
    handleLeftMatMesh.position.set(origin.x + holeDiameter + 10, origin.y + doorHeight / 2, shapeDeep);
    handleLeftMatMesh.rotateZ(Math.PI / 2);
    scene.add(handleLeftMatMesh);

    // Edge line for handle geometry
    const handleEdmat = new THREE.LineBasicMaterial({ color: 'white' });


    const handleEdgeo = new THREE.EdgesGeometry(handles);
    const handleEdges = new THREE.LineSegments(handleEdgeo, handleEdmat);
    handlesrMesh.add(handleEdges);

    // Edge line Handle Left
    const handleLeftEdge = new THREE.EdgesGeometry(handleLeft);
    const handleLeftEdgeSeg = new THREE.LineSegments(handleLeftEdge, handleEdmat);
    handleLeftMatMesh.add(handleLeftEdgeSeg);

    // // Edge line for clone2 handle geometry
    const handleRightEdge = new THREE.EdgesGeometry(handleRight);
    const handleRightEdgeSeg = new THREE.LineSegments(handleRightEdge, handleEdmat);
    handleRightMatMesh.add(handleRightEdgeSeg);

    // // Edge line for clone3 handle geometry
    const handleDownEdge = new THREE.EdgesGeometry(handleDown);
    const handleDownEdgeSeg = new THREE.LineSegments(handleDownEdge, handleEdmat);
    handleDownMatMesh.add(handleDownEdgeSeg);

    const ch = new THREE.SphereGeometry(2)
    const chmat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(origin.x, origin.y);
    scene.add(chmesh)
}
//#endregion

//#region Function 16 (diagonal)
function fun16() {
    const origin = new THREE.Vector2(0, 0);
    let doorHeight = 200, doorWidth = 300, holeDiameter = 50, handleHeight = 50, handleWidth = 100;

    // Handle height calculation
    if (handleHeight < 20) {
        handleHeight = 20;
    }
    if (handleHeight > doorHeight) {
        handleHeight = doorHeight;
    }
    if (holeDiameter + 20 > handleHeight) {
        holeDiameter = handleHeight - 20;
    }
    doorHeight = Math.max(doorHeight, 2 * holeDiameter + 40)
    // Extrusion 
    const shapeDeep = 10;
    const extrudeSetting = {
        depth: shapeDeep,
    };

    // Door formation
    const doorShape = new THREE.Shape();
    doorShape.moveTo(origin.x + 10, origin.y);
    doorShape.lineTo(origin.x + doorWidth - 10, origin.y);
    doorShape.quadraticCurveTo(origin.x + doorWidth, origin.y, origin.x + doorWidth, origin.y + 10)
    doorShape.lineTo(origin.x + doorWidth, origin.y + doorHeight - 10);
    doorShape.quadraticCurveTo(origin.x + doorWidth, origin.y + doorHeight, origin.x + doorWidth - 10, origin.y + doorHeight)
    doorShape.lineTo(origin.x + 10, origin.y + doorHeight);
    doorShape.quadraticCurveTo(origin.x, origin.y + doorHeight, origin.x, origin.y + doorHeight - 10)
    doorShape.lineTo(origin.x, origin.y + 10);
    doorShape.quadraticCurveTo(origin.x, origin.y, origin.x + 10, origin.y)


    const doorHoles = [
        { x: origin.x + holeDiameter, y: origin.y + doorHeight - holeDiameter },
    ];
    doorHoles.forEach(hole => {
        const doorHole = new THREE.Path();
        doorHole.absarc(hole.x, hole.y, holeDiameter / 2, 0, Math.PI * 2, true);
        doorShape.holes.push(doorHole);
    });



    // Door Extrusion
    const door = new THREE.ExtrudeGeometry(doorShape, extrudeSetting);
    const doormat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const doorMesh = new THREE.Mesh(door, doormat);
    scene.add(doorMesh);

    // handle Formaton 
    let handle = new THREE.Shape();
    // handle.moveTo(origin.x , origin.y)
    handle.lineTo(handleHeight / 2 - 5, 0);
    handle.quadraticCurveTo(handleHeight / 2, 0, handleHeight / 2, 5)
    handle.lineTo(handleHeight / 2, handleWidth - 5);
    handle.quadraticCurveTo(handleHeight / 2, handleWidth, handleHeight / 2 - 5, handleWidth)
    handle.lineTo(-handleHeight / 2 + 5, handleWidth);
    handle.quadraticCurveTo(-handleHeight / 2, handleWidth, -handleHeight / 2, handleWidth - 5)
    handle.lineTo(- handleHeight / 2, 5);
    handle.quadraticCurveTo(- handleHeight / 2, 0, - handleHeight / 2 + 5, 0)

    // Handle Hole 
    const HandleHole = new THREE.Path();
    // HandleHole.absarc(0, 0 + holeDiameter / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    HandleHole.absarc(0, holeDiameter / 2 + 5, holeDiameter / 2, 0, Math.PI * 2, true);
    handle.holes.push(HandleHole);


    //  Diagonal Handle
    const handles = new THREE.ExtrudeGeometry(handle, { depth: 20 });
    const handleMesh = new THREE.MeshBasicMaterial({ color: 0x00ff00ff, wireframe: false, side: THREE.DoubleSide });
    const handlesrMesh = new THREE.Mesh(handles, handleMesh);
    handlesrMesh.position.set(origin.x + holeDiameter + 14, origin.y + doorHeight - holeDiameter - 14, shapeDeep);
    handlesrMesh.rotateZ(Math.PI / 4)
    scene.add(handlesrMesh);

    // Edge line for handle geometry
    const handleEdgeo = new THREE.EdgesGeometry(handles);
    const handleEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const handleEdges = new THREE.LineSegments(handleEdgeo, handleEdmat);
    handlesrMesh.add(handleEdges);

    // Edge line for Door geometry
    const doorEdgeo = new THREE.EdgesGeometry(door);
    const doorEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const doorEdges = new THREE.LineSegments(doorEdgeo, doorEdmat);
    scene.add(doorEdges);



    const ch = new THREE.SphereGeometry(5)
    const chmat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(handleHeight / 2, doorHeight - holeDiameter);
    // scene.add(chmesh)
}
//#endregion

//#region Function 17 (tubeGeometry)
function fun17() {
    function pointsIdentification(x, y, z) {
        const ch = new THREE.SphereGeometry(1)
        const chmat = new THREE.MeshBasicMaterial({ color: 'blue' })
        const chmesh = new THREE.Mesh(ch, chmat);
        chmesh.position.set(x, y, z);
        scene.add(chmesh)
    }
    const origin = new THREE.Vector2(0, 0);
    const width = 90, height = 90;
    const depth = 10;
    var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(origin.x, origin.y, 0),
        new THREE.Vector3(origin.x + width, origin.y - width / 10, 0),
        new THREE.Vector3(origin.x + width + width / 10, origin.y - height, 0),
        new THREE.Vector3(origin.x, origin.y - height, 0),

    ]);
    for (let i = 0; i < curve.points.length; i++) {
        const element = curve.points[i];
        pointsIdentification(element.x)
        console.log(element);
    }

    const geometry = new THREE.TubeGeometry(curve, 10, depth, 10, false);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);

    // Create edges geometry and line segments
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 'white' });
    const lineSegments = new THREE.LineSegments(edges, lineMaterial);
    scene.add(lineSegments)

    scene.add(mesh);
    camera.position.z = 100;
}
//#endregion

//#region Function 18  Object Hierarchy 
function fun18() {
    function createObject3D() {
        const geometry = new THREE.BoxGeometry(30, 30, 30);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }
    const helper = new THREE.AxesHelper(100);
    scene.add(helper);
    const box = new THREE.BoxGeometry(50, 50, 50);
    const Material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
    const boxMesh = new THREE.Mesh(box, Material);
    scene.add(boxMesh);
    boxMesh.position.set(100, 0, 0);
    const sphere = new THREE.SphereGeometry(25);
    const sphereMesh = new THREE.Mesh(sphere, Material);

    // scene.add(sphereMesh)   // SPHERE BECOME THE CHILD OF THE SCENE
    boxMesh.add(sphereMesh)    // SPHERE BECOME THE CHILD OF BOX GEOMETRY

    const object3D = createObject3D();
    sphereMesh.add(object3D);

}
//#endregion

//#region Function 19  (absarc + quadraticCurve + bezierCurve )
function fun19() {

    const helper = new THREE.AxesHelper(100);
    scene.add(helper);
    const path = new THREE.Shape();
    path.moveTo(0, 0);
    path.lineTo(10, 0);
    path.lineTo(10, 10);
    path.absarc(15, 10, 5, Math.PI, 0, true)
    path.lineTo(25, 10);
    path.quadraticCurveTo(30, 15, 35, 10);
    pointsIdentification(30, 15)
    path.lineTo(40, 10);
    path.bezierCurveTo(45, 15, 50, 15, 55, 10)
    pointsIdentification(45, 15)
    pointsIdentification(50, 15)
    path.lineTo(60, 10);

    path.lineTo(60, 0)
    const extrudeSettings = {
        depth: 4,
    };

    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshBasicMaterial({ color: 'green', wireframe: true });
    const mesh = new THREE.Mesh(geo, geoMat);
    scene.add(mesh);

}
//#endregion

//#region Function 20 (diagonal + side )
function fun20() {
    const origin = new THREE.Vector2(0, 0);
    let doorHeight = 200, doorWidth = 300, holeDiameter = 50, handleHeight = 50, handleWidth = 100;

    // Handle height calculation
    if (handleHeight < 20) {
        handleHeight = 20;
    }
    if (handleHeight > doorHeight) {
        handleHeight = doorHeight;
    }
    if (holeDiameter + 20 > handleHeight) {
        holeDiameter = handleHeight - 20;
    }
    doorHeight = Math.max(doorHeight, 2 * holeDiameter + 40)
    // Extrusion 
    const shapeDeep = 10;
    const extrudeSetting = {
        depth: shapeDeep,
    };

    // Door formation
    const doorShape = new THREE.Shape();
    doorShape.moveTo(origin.x + 10, origin.y);
    doorShape.lineTo(origin.x + doorWidth - 10, origin.y);
    doorShape.quadraticCurveTo(origin.x + doorWidth, origin.y, origin.x + doorWidth, origin.y + 10)
    doorShape.lineTo(origin.x + doorWidth, origin.y + doorHeight - 10);
    doorShape.quadraticCurveTo(origin.x + doorWidth, origin.y + doorHeight, origin.x + doorWidth - 10, origin.y + doorHeight)
    doorShape.lineTo(origin.x + 10, origin.y + doorHeight);
    doorShape.quadraticCurveTo(origin.x, origin.y + doorHeight, origin.x, origin.y + doorHeight - 10)
    doorShape.lineTo(origin.x, origin.y + 10);
    doorShape.quadraticCurveTo(origin.x, origin.y, origin.x + 10, origin.y)


    const doorHoles = [
        { x: origin.x + holeDiameter, y: origin.y + doorHeight - holeDiameter },
        // { x: origin.x + holeDiameter / 2 + 5, y: origin.y + doorHeight / 2 },
        { x: origin.x - holeDiameter / 2 - 5 + doorWidth, y: origin.y + doorHeight / 2 },
        { x: origin.x + doorWidth / 2, y: origin.y + holeDiameter - 10 },
        //     { x: origin.x + doorWidth / 2, y: origin.y + doorHeight - holeDiameter + 10 },
    ];
    doorHoles.forEach(hole => {
        const doorHole = new THREE.Path();
        doorHole.absarc(hole.x, hole.y, holeDiameter / 2, 0, Math.PI * 2, true);
        doorShape.holes.push(doorHole);
    });


    // const doorHoles = [

    // ];
    // doorHoles.forEach(hole => {
    //     const doorHole = new THREE.Path();
    //     doorHole.absarc(hole.x, hole.y, holeDiameter / 2, 0, Math.PI * 2, true);
    //     doorShape.holes.push(doorHole);
    // });



    // Door Extrusion
    const door = new THREE.ExtrudeGeometry(doorShape, extrudeSetting);
    const doormat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const doorMesh = new THREE.Mesh(door, doormat);
    scene.add(doorMesh);

    // handle Formaton 
    let handle = new THREE.Shape();
    // handle.moveTo(origin.x , origin.y)
    handle.lineTo(handleHeight / 2 - 5, 0);
    handle.quadraticCurveTo(handleHeight / 2, 0, handleHeight / 2, 5)
    handle.lineTo(handleHeight / 2, handleWidth - 5);
    handle.quadraticCurveTo(handleHeight / 2, handleWidth, handleHeight / 2 - 5, handleWidth)
    handle.lineTo(-handleHeight / 2 + 5, handleWidth);
    handle.quadraticCurveTo(-handleHeight / 2, handleWidth, -handleHeight / 2, handleWidth - 5)
    handle.lineTo(- handleHeight / 2, 5);
    handle.quadraticCurveTo(- handleHeight / 2, 0, - handleHeight / 2 + 5, 0)

    // Handle Hole 
    const HandleHole = new THREE.Path();
    // HandleHole.absarc(0, 0 + holeDiameter / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    HandleHole.absarc(0, holeDiameter / 2 + 5, holeDiameter / 2, 0, Math.PI * 2, true);
    handle.holes.push(HandleHole);


    //  Diagonal Handle
    const handles = new THREE.ExtrudeGeometry(handle, { depth: 20 });
    const handleMesh = new THREE.MeshBasicMaterial({ color: 0x00ff00ff, wireframe: false, side: THREE.DoubleSide });
    const handlesrMesh = new THREE.Mesh(handles, handleMesh);
    handlesrMesh.position.set(origin.x + holeDiameter + 14, origin.y + doorHeight - holeDiameter - 14, shapeDeep);
    handlesrMesh.rotateZ(Math.PI / 4)
    scene.add(handlesrMesh);


    // clone Handle 

    //  Handle DOWN
    const handleDown = handles.clone();
    const handleDownMat = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false, side: THREE.DoubleSide });
    const handleDownMatMesh = new THREE.Mesh(handleDown, handleDownMat);
    handleDownMatMesh.position.set(origin.x + doorWidth / 2, origin.y + holeDiameter + 10, shapeDeep * 2);
    handleDown.rotateX(Math.PI)
    scene.add(handleDownMatMesh);

    // Handle RIGHT
    const handleRight = handles.clone();
    const handleRightMat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false, side: THREE.DoubleSide });
    const handleRightMatMesh = new THREE.Mesh(handleRight, handleRightMat);
    handleRightMatMesh.position.set(origin.x + doorWidth - holeDiameter - 10, origin.y + doorHeight / 2, shapeDeep);
    handleRightMatMesh.rotateZ(-Math.PI / 2);
    scene.add(handleRightMatMesh);


    // Edge line for handle geometry
    const handleEdgeo = new THREE.EdgesGeometry(handles);
    const handleEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const handleEdges = new THREE.LineSegments(handleEdgeo, handleEdmat);
    handlesrMesh.add(handleEdges);

    // Edge line for Door geometry
    const doorEdgeo = new THREE.EdgesGeometry(door);
    const doorEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const doorEdges = new THREE.LineSegments(doorEdgeo, doorEdmat);
    scene.add(doorEdges);



    const ch = new THREE.SphereGeometry(5)
    const chmat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(handleHeight / 2, doorHeight - holeDiameter);
    // scene.add(chmesh)
}
//#endregion

//#region Function (21 - 24) (Handle)
const turnRight = false;

const directionalTop = new THREE.DirectionalLight(0xffffff, 1);
directionalTop.position.set(0, 50, 0);
scene.add(directionalTop);

const directionalDown = new THREE.DirectionalLight(0xffffff, 1);
directionalDown.position.set(0, -20, -50);
scene.add(directionalDown);

const directionalRight = new THREE.DirectionalLight(0xffffff, 1);
directionalRight.position.set(50, 0, 50);
scene.add(directionalRight);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight4.position.set(-50, 0, 0);
scene.add(directionalLight4);


//#region Function - 1  Lock Base 
function fun21() {
    const x_handle_Position = 0,
        y_handle_Position = 0,
        z_handle_Position = 0;
    const width = 10,
        height = 29,
        radius = 7;
    const path = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);
    path.moveTo(origin.x, origin.y + height / 2);
    path.absarc(
        origin.x,
        origin.y + radius,
        radius,
        Math.PI * 1.5,
        Math.PI / 2,
        false
    );
    path.quadraticCurveTo(
        origin.x - 5,
        origin.y + radius * 2,
        origin.x - 5,
        origin.y + radius * 2 + height / 4
    );
    path.lineTo(origin.x - width, origin.y + radius * 2 + height / 4);
    path.lineTo(origin.x - width, origin.y - height / 4);
    path.lineTo(origin.x - 5, origin.y - height / 4);
    path.quadraticCurveTo(origin.x - 5, origin.y, origin.x, origin.y);

    const LockExtrude = 5;
    const extrudeSettings = { depth: LockExtrude, bevelEnabled: false };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshPhysicalMaterial({ color: "#e4e6e8" });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(x_handle_Position, y_handle_Position, z_handle_Position);
    scene.add(mesh);

    // Add edge lines (Only front & back faces)
    const contour = path.getPoints(50);
    const lineMaterial = new THREE.LineBasicMaterial({ color: "white" });

    const frontEdges = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(contour),
        lineMaterial
    );
    const backEdges = frontEdges.clone();
    backEdges.position.set(0, 0, LockExtrude);

    mesh.add(frontEdges);
    mesh.add(backEdges);

    // Add circular elements
    const circleMaterial = new THREE.MeshPhysicalMaterial({
        wireframe: false,
        side: THREE.DoubleSide,
    });
    const circle1 = new THREE.Mesh(new THREE.CircleGeometry(1.5), circleMaterial);
    const circle2 = new THREE.Mesh(new THREE.CircleGeometry(1.5), circleMaterial);
    circle1.position.set(-7.5, -4, LockExtrude + 0.1);
    circle2.position.set(-7.5, height / 2 + 3, LockExtrude + 0.1);
    mesh.add(circle1);
    mesh.add(circle2);

    if (turnRight) {
        mesh.rotateY(Math.PI);
        circle1.position.set(-7.5, -4, -0.1);
        circle2.position.set(-7.5, height / 2 + 3, -0.1);
    }

    // Add small pit holes
    const pit = new THREE.Shape();
    const pos = new THREE.Vector2(0, 0);
    const rad = 0.5;
    pit.moveTo(pos.x, pos.y);
    pit.absarc(pos.x, pos.y, rad, Math.PI * 1.5, Math.PI * 0.5, false);
    pit.absarc(pos.x - rad, pos.y + rad, rad, 0, Math.PI, false);
    pit.absarc(pos.x - rad * 2, pos.y, rad, Math.PI / 2, Math.PI * 1.5, false);
    pit.absarc(pos.x - rad, pos.y - rad, rad, Math.PI, 0, false);

    const pitHole = new THREE.ExtrudeGeometry(pit, {
        depth: 0.1,
        bevelEnabled: false,
    });
    const pitHoleMat = new THREE.MeshPhysicalMaterial({ color: "black" });

    const meshPit1 = new THREE.Mesh(pitHole, pitHoleMat);
    meshPit1.position.set(rad, 0, 0);
    circle1.add(meshPit1);

    const meshPit2 = new THREE.Mesh(pitHole.clone(), pitHoleMat);
    meshPit2.position.set(rad, 0, 0);
    circle2.add(meshPit2);

    // Add edge lines for pit holes
    const pitEdges = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pit.getPoints(30)),
        lineMaterial
    );
    // meshPit1.add(pitEdges);

    const pitEdges2 = pitEdges.clone();
    // meshPit2.add(pitEdges2);

    // Add lock component
    const lock = fun24();
    mesh.add(lock);
}
//#endregion

//#region Function - 2  // Lock Handle 
function fun22() {
    const depth = 5.3,
        height = 50;
    const path = new THREE.Shape();
    const origin = new THREE.Vector2(0, -height);

    path.moveTo(origin.x, origin.y);
    path.absarc(origin.x + depth / 2, origin.y, depth / 2, Math.PI, 0, false);
    path.lineTo(origin.x + depth, origin.y + height);
    path.lineTo(origin.x, origin.y + height);

    const extrudeSettings = { depth: 2, bevelEnabled: false };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshPhysicalMaterial({
        color: "#f2f3f4",
        wireframe: false,
    });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(-4.85, -9, 6);

    const contour = path.getPoints();
    const lineMaterial = new THREE.LineBasicMaterial({ color: "white" });

    const frontEdges = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(contour),
        lineMaterial
    );
    const backEdges = frontEdges.clone();
    backEdges.position.set(0, 0, extrudeSettings.depth);

    mesh.add(frontEdges);
    mesh.add(backEdges);

    const curve = fun23();
    mesh.add(curve);

    if (turnRight) {
        mesh.rotateY(Math.PI);
        mesh.position.set(0.5, -9, -4);
    }

    return mesh;
}

//#endregion

//#region Function - 3 // Lock Curve
function fun23() {
    const innerRadius = 3,
        deep = 2;
    const path = new THREE.Shape();
    const heightOfHandle = 0;
    const origin = new THREE.Vector2(0, heightOfHandle);

    path.moveTo(origin.x, origin.y);
    path.absarc(
        origin.x + innerRadius,
        origin.y,
        innerRadius,
        Math.PI,
        Math.PI / 2,
        true
    );
    path.absarc(
        origin.x + innerRadius,
        origin.y + innerRadius * 2,
        innerRadius,
        Math.PI * 1.5,
        0,
        false
    );
    path.lineTo(origin.x + innerRadius * 2 - deep, origin.y + innerRadius * 2);
    path.absarc(
        origin.x + innerRadius,
        origin.y + innerRadius * 2,
        innerRadius - deep,
        0,
        Math.PI * 1.5,
        true
    );
    path.absarc(
        origin.x + innerRadius,
        origin.y,
        innerRadius + deep,
        Math.PI / 2,
        Math.PI,
        false
    );

    const extrudeSettings = { depth: 5.3, bevelEnabled: false };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        wireframe: false,
        roughness: 100,
        metalness: 0,
    });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.rotateY(Math.PI / 2);

    const contour = path.getPoints();
    const lineMaterial = new THREE.LineBasicMaterial({ color: "white" });

    const frontEdges = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(contour),
        lineMaterial
    );
    const backEdges = frontEdges.clone();
    backEdges.position.set(0, 0, extrudeSettings.depth);

    mesh.add(frontEdges);
    mesh.add(backEdges);

    return mesh;
}

//#endregion

//#region Function - 4 // Lock 
function fun24() {
    const lockHeight = 10, lockWidth = 9.9;
    const path = new THREE.Shape();
    const origin = new THREE.Vector2(0.2, 0);
    path.quadraticCurveTo(origin.x + 1, origin.y, origin.x + 0.5, origin.y + lockHeight / 2);
    path.quadraticCurveTo(origin.x, origin.y + lockHeight - lockHeight / 4, origin.x - lockWidth / 3, origin.y + lockHeight);
    path.quadraticCurveTo(origin.x - lockWidth / 3 - lockWidth / 4, origin.y + lockHeight + 0.4, origin.x - lockWidth / 3 - lockWidth / 2, origin.y + lockHeight);
    path.quadraticCurveTo(origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 6, origin.y + lockHeight - lockHeight / 6, origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 3, origin.y + lockHeight - lockHeight / 5);
    path.bezierCurveTo(origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 4 - lockWidth / 2, origin.y + lockHeight - lockHeight / 3, origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth, origin.y + lockHeight / 1.5, origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 8 - lockWidth / 2, origin.y + lockHeight / 4);
    path.lineTo(origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 3, origin.y + lockHeight / 10);
    path.lineTo(origin.x - lockWidth / 1.2, origin.y + lockHeight / 15);
    path.quadraticCurveTo(origin.x - lockWidth / 2, origin.y + lockHeight / 15, origin.x - lockWidth / 2, origin.y - lockHeight / 3);
    path.lineTo(origin.x + 0.2, origin.y - lockHeight / 3);
    path.quadraticCurveTo(origin.x + 1, origin.y, origin.x, origin.y + lockHeight / 2);

    const deepLock = 2;
    const extrudeSettings = {
        depth: deepLock,
        bevelEnabled: false,
    };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshPhysicalMaterial({
        color: "#f2f3f4",
        wireframe: false,
    });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(2, 3, 5);

    const radius = lockHeight / 2.5;
    const hemisphereGeometry = new THREE.SphereGeometry(
        radius,
        15,
        15,
        0,
        Math.PI
    );
    const matSphere = new THREE.MeshPhysicalMaterial({
        color: "#f2f3f4",
        wireframe: false,
    });
    const sphereMesh = new THREE.Mesh(hemisphereGeometry, matSphere);
    sphereMesh.position.set(-lockWidth / 2, lockHeight / 2, 1);
    mesh.add(sphereMesh);

    if (turnRight) {
        mesh.position.set(2, 2, -2);
        sphereMesh.position.set(-5, lockHeight / 2, -0.1);
        sphereMesh.rotateX(Math.PI);
    }

    const HandleLock = fun22();
    mesh.add(HandleLock);

    const contour = path.getPoints();
    const lineMaterial = new THREE.LineBasicMaterial({ color: "white" });

    const frontEdges = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(contour),
        lineMaterial
    );
    const backEdges = frontEdges.clone();
    backEdges.position.set(0, 0, extrudeSettings.depth);

    mesh.add(frontEdges);
    // mesh.add(backEdges);

    return mesh;
}
//#endregion

//#endregion

//#region Handle (fun 25 - 29 ) (Patio handle)
let turnLeft = true;
let height = 400;
let width = 100;
let CylinderHeight = 10;
let CylinderWidthLength = 70;
let y_key_pos = 0;
let y_design = 0;
let cylinderWidth = width / 4;

//#region Hnadle Base
function fun25() {
    const x_Patio_handle = 0, y_Patio_handle = 0, z_Patio_handle = 0;

    const origin = new THREE.Vector2(0, 0);
    const path = new THREE.Shape();
    path.absarc(origin.x + width / 2, origin.y, width / 2, Math.PI, 0, false);
    path.lineTo(origin.x + width, origin.y + height);
    path.absarc(origin.x + width / 2, origin.y + height, width / 2, 0, Math.PI, false);
    path.lineTo();

    const clonePath = path.clone();


    let upWidth = 55, upLength = 55;
    const key = new THREE.Shape();

    const x_key_pos = width / 2 - upWidth / 4;
    let y_pos = y_key_pos + upLength + upWidth / 2;
    if (y_pos < upLength + upWidth / 2) {
        y_pos = upLength + upWidth / 2;
    }
    if (y_pos >= width / 2 + upLength + upWidth / 2 + upLength + upWidth / 2) {
        y_pos = width / 2 + upLength + upWidth / 2 + upLength + upWidth / 2 - 2;
    }
    upWidth /= 2;
    const keyOrigin = new THREE.Vector2(x_key_pos, y_pos)
    key.absarc(keyOrigin.x + upWidth / 2, + keyOrigin.y, upWidth / 2, -Math.PI / 3, Math.PI + Math.PI / 3, false);
    key.absarc(keyOrigin.x + upWidth / 2, -upLength + keyOrigin.y, upWidth / 4, Math.PI, 0, false);
    path.holes.push(key);

    const keyLineSeg = key.getPoints(50);
    const frontEdges_key = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(keyLineSeg), new THREE.LineBasicMaterial({ color: "white" }));
    frontEdges_key.position.set(0, 0, 5)


    const baseExtrude = 5;
    const geo = new THREE.ExtrudeGeometry(path, { depth: baseExtrude, bevelEnabled: false });
    const geoMat = new THREE.MeshPhysicalMaterial({ color: "#e4e6e8", wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(x_Patio_handle, y_Patio_handle, z_Patio_handle);
    scene.add(mesh);

    const cloneMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(clonePath, { depth: 1, bevelEnabled: false }), geoMat);
    cloneMesh.position.set(0, 0, -1)
    mesh.add(cloneMesh)
    mesh.add(frontEdges_key)


    const contour = path.getPoints(50);
    const frontEdges = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(contour), new THREE.LineBasicMaterial({ color: "white" }));
    const backEdges = frontEdges.clone();
    backEdges.position.set(0, 0, baseExtrude);
    mesh.add(frontEdges);
    mesh.add(backEdges);


    // handle strted here
    // cylinder 1 and cylinder 2 
    const material = new THREE.MeshPhysicalMaterial({ color: '#e4e6e8', wireframe: false });

    const geometry1 = new THREE.CylinderGeometry(cylinderWidth, cylinderWidth, CylinderHeight);
    const cylinder1 = new THREE.Mesh(geometry1, material);
    cylinder1.position.set(width / 2, - cylinderWidth / 2 + cylinderWidth / 10, CylinderHeight / 2 + baseExtrude);
    cylinder1.rotateX(Math.PI / 2)
    mesh.add(cylinder1);


    const geometry2 = geometry1.clone();
    const cylinder2 = new THREE.Mesh(geometry2, material);
    cylinder2.position.set(width / 2, height + cylinderWidth / 2 - cylinderWidth / 10, CylinderHeight / 2 + baseExtrude);
    cylinder2.rotateX(Math.PI / 2)
    mesh.add(cylinder2);

    // Curve 1 and curve 2 
    const torusMaterial = new THREE.MeshPhysicalMaterial({ color: '#e4e6e8', wireframe: false, side: THREE.DoubleSide });

    const torusGeometry1 = new THREE.TorusGeometry(cylinderWidth, cylinderWidth, 16, 16, Math.PI / 2);
    const torus1 = new THREE.Mesh(torusGeometry1, torusMaterial);
    torus1.position.set(cylinderWidth, CylinderHeight / 2, 0)
    torus1.rotateZ(Math.PI / 2);
    cylinder1.add(torus1);

    const torusGeometry2 = torusGeometry1.clone();
    const torus2 = new THREE.Mesh(torusGeometry2, torusMaterial);
    torus2.position.set(cylinderWidth, CylinderHeight / 2, 0)
    torus2.rotateZ(Math.PI / 2);
    cylinder2.add(torus2);

    // cylinder 3 and cylinder 4 

    const geometry3 = new THREE.CylinderGeometry(cylinderWidth, cylinderWidth, CylinderWidthLength);
    const cylinder3 = new THREE.Mesh(geometry3, material);
    cylinder3.position.set(cylinderWidth, -CylinderWidthLength / 2, 0)
    torus1.add(cylinder3);


    const cylinder4 = new THREE.Mesh(geometry3, material);
    cylinder4.position.set(cylinderWidth, -CylinderWidthLength / 2, 0)
    torus2.add(cylinder4);

    const Patio_handle_clone = mesh.clone();
    const cylinderHandle = fun26();
    cylinder4.add(cylinderHandle);

    const up1 = fun27();
    const up2 = fun27();
    mesh.add(up1);
    Patio_handle_clone.add(up2)



    if (turnLeft) {
        torus1.rotateX(Math.PI);
        torus2.rotateX(Math.PI);
        torus1.position.set(-cylinderWidth, CylinderHeight / 2, 0);
        torus2.position.set(-cylinderWidth, CylinderHeight / 2, 0);
    }



    Patio_handle_clone.add(fun29())
    Patio_handle_clone.position.set(400, 0, 0);
    scene.add(Patio_handle_clone);


}
//#endregion

//#region Holding Hnadle 
function fun26() {
    let CylinderHeight = height - cylinderWidth;
    const material = new THREE.MeshPhysicalMaterial({ color: '#e4e6e8', wireframe: false });
    const geometry1 = new THREE.CylinderGeometry(cylinderWidth, cylinderWidth, CylinderHeight);
    const cylinderHandle = new THREE.Mesh(geometry1, material);
    cylinderHandle.position.set(0, -CylinderWidthLength / 2 - cylinderWidth, height / 2 + cylinderWidth / 2)
    cylinderHandle.rotateX(- Math.PI / 2);
    cylinderHandle.rotateY(- Math.PI / 2);
    // scene.add(cylinderHandle);

    // Torous 3 and torous 4 
    const torusMaterial = new THREE.MeshPhysicalMaterial({ color: '#e4e6e8', wireframe: false, side: THREE.DoubleSide });

    const torusGeometry3 = new THREE.TorusGeometry(cylinderWidth, cylinderWidth, 16, 16, Math.PI / 2);
    const torus3 = new THREE.Mesh(torusGeometry3, torusMaterial);
    torus3.position.set(cylinderWidth, CylinderHeight / 2, 0)
    torus3.rotateZ(Math.PI / 2)
    cylinderHandle.add(torus3);


    const torusGeometry4 = torusGeometry3.clone();
    const torus4 = new THREE.Mesh(torusGeometry4, torusMaterial);
    torus4.position.set(cylinderWidth, -CylinderHeight / 2 + cylinderWidth / 5, 0)
    torus4.rotateX(Math.PI);
    torus4.rotateZ(Math.PI / 2)
    cylinderHandle.add(torus4);

    if (turnLeft) {
        cylinderHandle.position.set(0, -CylinderWidthLength / 2 - cylinderWidth, -(height / 2 + cylinderWidth / 4))
    }
    return cylinderHandle;
}
//#endregion

//#region  UpDiagram
function fun27() {
    let upWidth = 80, upLength = 80;
    const path = new THREE.Shape();
    let y_position = height / 2 + upLength + y_design;
    if (y_position < height / 2 + upLength) {
        y_position = height / 2 + upLength;
    }
    if (y_position > height - upWidth / 2) {
        y_position = height - upWidth / 2;
    }

    upWidth /= 2;
    path.absarc(upWidth / 2, 0, upWidth / 2, 0, Math.PI, false);
    path.absarc(upWidth / 2, -upLength, upWidth / 4, Math.PI, 0, false);
    const baseExtrude = 5;
    const geo = new THREE.ExtrudeGeometry(path, { depth: 5, bevelEnabled: false });
    const geoMat = new THREE.MeshPhysicalMaterial({ color: "#e4e6e8", wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(width / 2 - upWidth / 2, y_position, baseExtrude + 0.1);


    // Line segment 
    const contour = path.getPoints(50);
    const lineMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const frontEdges = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(contour), lineMaterial);
    const backEdges = frontEdges.clone();
    backEdges.position.set(0, 0, 5);
    mesh.add(frontEdges);
    mesh.add(backEdges);

    return mesh;
}
//#endregion

//#region Holding Hnadle 
function fun29() {
    let CylinderHeight = height - cylinderWidth;
    const material = new THREE.MeshPhysicalMaterial({ color: '#e4e6e8', wireframe: false });
    const geometry1 = new THREE.CylinderGeometry(cylinderWidth, cylinderWidth, CylinderHeight);
    const cylinderHandle = new THREE.Mesh(geometry1, material);
    cylinderHandle.position.set(width + CylinderWidthLength, CylinderHeight / 2 + cylinderWidth / 2, cylinderWidth * 1.5)
    cylinderHandle.rotateY(- Math.PI);
    // scene.add(cylinderHandle);

    // Torous 3 and torous 4 
    const torusMaterial = new THREE.MeshPhysicalMaterial({ color: '#e4e6e8', wireframe: false, side: THREE.DoubleSide });

    const torusGeometry3 = new THREE.TorusGeometry(cylinderWidth, cylinderWidth, 16, 16, Math.PI / 2);
    const torus3 = new THREE.Mesh(torusGeometry3, torusMaterial);
    torus3.position.set(cylinderWidth, CylinderHeight / 2, 0)
    torus3.rotateZ(Math.PI / 2)
    cylinderHandle.add(torus3);


    const torusGeometry4 = torusGeometry3.clone();
    const torus4 = new THREE.Mesh(torusGeometry4, torusMaterial);
    torus4.position.set(cylinderWidth, -CylinderHeight / 2 + cylinderWidth / 5, 0)
    torus4.rotateX(Math.PI);
    torus4.rotateZ(Math.PI / 2)
    cylinderHandle.add(torus4);


    return cylinderHandle;
}
//#endregion



//#endregion

//#region Function 30  Key hole
function fun30(radius, xPos, yPos) {
    const x_Patio_handle = xPos, y_Patio_handle = yPos;

    const outer_Radius = radius, inner_Radius = radius / 3;

    const originRound = new THREE.Vector2(0, 0);
    const roundPath = new THREE.Shape();
    roundPath.absarc(originRound.x, originRound.y, outer_Radius, 0, Math.PI * 2);

    const origin = new THREE.Vector2(0, inner_Radius);
    const path = new THREE.Shape();
    path.absarc(origin.x, origin.y, inner_Radius, - Math.PI / 3, Math.PI + Math.PI / 3, false);
    path.lineTo(origin.x - inner_Radius / 2, - inner_Radius * 2 + origin.y)
    path.absarc(origin.x - inner_Radius / 2, - inner_Radius * 1.5 - inner_Radius + origin.y, inner_Radius - inner_Radius / 2, Math.PI / 2, Math.PI * 1.5, true);
    path.lineTo(origin.x - inner_Radius / 2, - inner_Radius * 1.5 - inner_Radius - inner_Radius / 2 - radius / 10 + origin.y);
    path.lineTo(origin.x + inner_Radius / 2, - inner_Radius * 1.5 - inner_Radius - inner_Radius / 2 - radius / 10 + origin.y);
    path.absarc(origin.x + inner_Radius / 2, - inner_Radius * 1.5 - radius / 10 + origin.y, inner_Radius - inner_Radius / 2, Math.PI * 1.5, Math.PI / 2, true);

    roundPath.holes.push(path)
    const baseExtrude = 0;
    const geo = new THREE.ExtrudeGeometry(roundPath, { depth: baseExtrude, bevelEnabled: false });
    const geoMat = new THREE.MeshPhysicalMaterial({ color: "#e4e6e8", wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(x_Patio_handle, y_Patio_handle, 0);
    scene.add(mesh)
    return mesh;
}
//#endregion

//#region Handle (fun 31 - 34 ) (Lift and slide handle)

function getBackPlateHeight() {
    return 2500;
}

function getBackPlateWidth() {
    return 500;
}

function getHandleWidth() {
    return 900;
}

function getLongHandleHeight() {
    return 100;
}

function getXPatioHandle() {
    return 0;
}

function getYPatioHandle() {
    return -1300;
}

function getZPatioHandle() {
    return 0;
}

function isKeyAvailable() {
    return false;
}

function getKeyPosition() {
    return 300;
}

// fixed 
let curveHandleHeight = 900;
let curve_Width = 200;
const handleBaseExtrude = 50;

//#region HANDLE BASE PLATE

//#region Main function
function fun31() {
    const origin = new THREE.Vector2(0, 0);
    const path = new THREE.Shape();
    path.absarc(origin.x + getBackPlateWidth() / 2, origin.y, getBackPlateWidth() / 2, Math.PI, 0, false);
    path.lineTo(origin.x + getBackPlateWidth(), origin.y + getBackPlateHeight());
    path.absarc(origin.x + getBackPlateWidth() / 2, origin.y + getBackPlateHeight(), getBackPlateWidth() / 2, 0, Math.PI, false);
    path.lineTo();

    const backPlate2Base = path.clone();

    // key hole 
    let keyWidth = getBackPlateWidth() / 3, keyLength = 150, y_pos = getKeyPosition();
    const key = new THREE.Shape();
    const keyOrigin = new THREE.Vector2(getBackPlateWidth() / 2 - keyWidth / 2, y_pos)
    key.absarc(keyOrigin.x + keyWidth / 2, + keyOrigin.y, keyWidth / 2, -Math.PI / 3, Math.PI + Math.PI / 3, false);
    key.absarc(keyOrigin.x + keyWidth / 2, -keyLength + keyOrigin.y, keyWidth / 4, Math.PI, 0, false);

    const keyHoleLine = key.getPoints();
    const KeyLineSegHole = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(keyHoleLine), new THREE.LineBasicMaterial({ color: "white" }));
    const backEdgesBoltHole = KeyLineSegHole.clone();
    backEdgesBoltHole.position.set(0, 0, 50);

    if (!isKeyAvailable()) {
        path.holes.push(key);
    }

    // Bolt Hole
    const boltHole1 = new THREE.Shape();
    const boltDiameter = getBackPlateWidth() / 4;
    boltHole1.absarc(getBackPlateWidth() / 2, -getBackPlateWidth() / 2 + boltDiameter / 2 + getBackPlateHeight() / 12, boltDiameter / 2, 0, Math.PI * 2, false);
    path.holes.push(boltHole1);

    const boltHole2 = new THREE.Shape();
    boltHole2.absarc(getBackPlateWidth() / 2, getBackPlateHeight() + getBackPlateWidth() / 2 - boltDiameter / 2 - getBackPlateHeight() / 12, boltDiameter / 2, 0, Math.PI * 2, false);
    path.holes.push(boltHole2);

    // THIS IS FOR THE BACKPLATE 
    const baseExtrude = 50;
    const geo2 = new THREE.ExtrudeGeometry(backPlate2Base, { depth: 1, bevelEnabled: false });
    const geo2Mat = new THREE.MeshPhysicalMaterial({ color: "#e4e6e8", wireframe: false });
    const backPlate2 = new THREE.Mesh(geo2, geo2Mat);
    backPlate2.position.set(0, 0, - 1);

    const geo = new THREE.ExtrudeGeometry(path, { depth: baseExtrude, bevelEnabled: false });
    const geoMat = new THREE.MeshPhysicalMaterial({ color: "#e4e6e8", wireframe: false });
    const backPlate = new THREE.Mesh(geo, geoMat);
    backPlate.position.set(getXPatioHandle(), getYPatioHandle(), getZPatioHandle());
    scene.add(backPlate);

    // BACK PLATE EDGES LINE SEGMENT 
    const contour = path.getPoints(50);
    const frontEdges = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(contour), new THREE.LineBasicMaterial({ color: "white" }));
    const backEdges = frontEdges.clone();
    backEdges.position.set(0, 0, baseExtrude);
    backPlate.add(frontEdges);
    backPlate.add(backEdges);

    let radiusTop = getLongHandleHeight();
    let radiusBottom = (getBackPlateWidth() < 150) ? (85) : (getBackPlateWidth() / 2 - getBackPlateWidth() / 20), cylinderHeight = 50;
    if (radiusTop > radiusBottom) {
        radiusTop = radiusBottom - 5;
    }

    // CYLINDER FRUSTRUM HANDLE BASE 
    const slantheight = 40;
    const frustumCylinderBase = new THREE.CylinderGeometry(radiusTop, radiusBottom, slantheight, 32);
    const material = new THREE.MeshPhysicalMaterial({ color: "#e4e6e8", wireframe: false });
    const frustumCylinderBaseMesh = new THREE.Mesh(frustumCylinderBase, material);
    frustumCylinderBaseMesh.position.set(getBackPlateWidth() / 2, getBackPlateHeight() / 2 + getBackPlateHeight() / 8, cylinderHeight / 2 + baseExtrude + cylinderHeight)
    frustumCylinderBaseMesh.rotateX(Math.PI / 2);
    backPlate.add(frustumCylinderBaseMesh);

    // CYLINDER HANDLE BASE 
    const cylinderBase = new THREE.CylinderGeometry(radiusBottom, radiusBottom, cylinderHeight, 32);
    const cylinderBaseMesh = new THREE.Mesh(cylinderBase, material);
    cylinderBaseMesh.position.set(getBackPlateWidth() / 2, getBackPlateHeight() / 2 + getBackPlateHeight() / 8, cylinderHeight / 2 + baseExtrude)
    cylinderBaseMesh.rotateX(Math.PI / 2);
    backPlate.add(cylinderBaseMesh);

    // Lift and slide Handle 
    const LASHandle = fun32();
    frustumCylinderBaseMesh.add(LASHandle);
    LASHandle.position.set(-getHandleWidth() - curve_Width / 2, cylinderHeight * 2 + baseExtrude + 90, radiusTop / 2)
    LASHandle.rotateX(-Math.PI / 2)

    // cross Hole in the Bolt hole 
    const crossHole1 = fun34();
    crossHole1.position.set(getBackPlateWidth() / 2, -getBackPlateWidth() / 2 + boltDiameter / 2 + getBackPlateHeight() / 12, -4)
    backPlate.add(crossHole1);

    const crossHole2 = fun34();
    crossHole2.position.set(getBackPlateWidth() / 2, getBackPlateHeight() + getBackPlateWidth() / 2 - boltDiameter / 2 - getBackPlateHeight() / 12, -4)
    backPlate.add(crossHole2);

    // CLONE THE Lift and slide handle - 2
    const rightBackPlateGeo = geo.clone();
    const rightBackPlateMat = geoMat.clone();
    const rightBackPlate = new THREE.Mesh(rightBackPlateGeo, rightBackPlateMat);
    rightBackPlate.position.set(getBackPlateWidth() + 100, 0, 0);
    // scene.add(rightBackPlate);

    const cylinderCloneMesh = new THREE.Mesh(frustumCylinderBase.clone(), material.clone());
    rightBackPlate.add(cylinderCloneMesh)
    cylinderCloneMesh.position.set(getBackPlateWidth() / 2, getBackPlateHeight() / 2 + getBackPlateHeight() / 8, cylinderHeight / 2 + baseExtrude + cylinderHeight - 15)
    cylinderCloneMesh.rotateX(Math.PI / 2);

    const LASHandle2 = fun32();
    cylinderCloneMesh.add(LASHandle2);
    LASHandle2.position.set(getHandleWidth() + curve_Width / 2 - 5, curveHandleHeight / 2 + baseExtrude + cylinderHeight / 2, -radiusTop / 2)
    LASHandle2.rotateX(-Math.PI / 2);
    LASHandle2.rotateZ(Math.PI);

    // cylinder base 
    const cylinderBase2 = new THREE.CylinderGeometry(radiusBottom, radiusBottom, cylinderHeight, 32);
    const cylinderBaseMesh2 = new THREE.Mesh(cylinderBase2, material);
    cylinderBaseMesh2.position.set(getBackPlateWidth() / 2, getBackPlateHeight() / 2 + getBackPlateHeight() / 8, cylinderHeight / 2 + baseExtrude)
    cylinderBaseMesh2.rotateX(Math.PI / 2);
    rightBackPlate.add(cylinderBaseMesh2);


    const crossHole3 = fun34();
    crossHole3.position.set(getBackPlateWidth() / 2, -getBackPlateWidth() / 2 + boltDiameter / 2 + getBackPlateHeight() / 12, -4)
    rightBackPlate.add(crossHole3);

    const crossHole4 = fun34();
    crossHole4.position.set(getBackPlateWidth() / 2, getBackPlateHeight() + getBackPlateWidth() / 2 - boltDiameter / 2 - getBackPlateHeight() / 12, -4)
    rightBackPlate.add(crossHole4);
}
//#endregion

//#region LS Handle
function fun32() {
    const LS_Handle = new THREE.Shape();
    LS_Handle.moveTo(0, 0);
    LS_Handle.quadraticCurveTo(getHandleWidth() / 2, - getLongHandleHeight() / 8, getHandleWidth(), 0)
    LS_Handle.lineTo(getHandleWidth(), getLongHandleHeight())
    LS_Handle.quadraticCurveTo(getHandleWidth() / 2, getLongHandleHeight() + getLongHandleHeight() / 8, 0, getLongHandleHeight())
    LS_Handle.lineTo()
    const LS_Handlegeometry = new THREE.ExtrudeGeometry(LS_Handle, { depth: handleBaseExtrude, bevelEnabled: false });
    const LS_HandleMaterial = new THREE.MeshPhysicalMaterial({ color: "#e4e6e8", wireframe: false });
    const LSHandleMesh = new THREE.Mesh(LS_Handlegeometry, LS_HandleMaterial);

    const handleCurve = fun33();
    LSHandleMesh.add(handleCurve);

    return LSHandleMesh;
}
//#endregion

//#region LS Handle curve
function fun33() {
    let curve_Width = 200;
    let curveHandleHeight = 200;
    // const h = new THREE.AxesHelper(10);
    // scene.add(h)
    const path = new THREE.Shape();
    path.moveTo(curve_Width / 2, 0);
    path.lineTo(0, 0);
    path.quadraticCurveTo(curve_Width / 5, curveHandleHeight / 2 + curveHandleHeight / 5, - curve_Width / 10, curveHandleHeight);
    path.quadraticCurveTo(- curve_Width / 10, curveHandleHeight, - curve_Width / 10 - curve_Width / 10, curveHandleHeight + curve_Width / 10);
    path.lineTo(- curve_Width / 10 - curve_Width / 10, curveHandleHeight + curve_Width / 10 + handleBaseExtrude);
    path.quadraticCurveTo(- curve_Width / 10, curveHandleHeight + curve_Width / 10 + handleBaseExtrude, curve_Width / 7, curveHandleHeight + curveHandleHeight / 3.5);
    path.lineTo(curve_Width / 3, curveHandleHeight + curveHandleHeight / 7)
    path.quadraticCurveTo(curve_Width / 2 - 5, curveHandleHeight / 2 + curveHandleHeight / 14, curve_Width / 2 + curve_Width / 20, 0)

    const geo = new THREE.ExtrudeGeometry(path, { depth: getLongHandleHeight(), bevelEnabled: false });
    const geoMat = new THREE.MeshPhysicalMaterial({ color: "#e4e6e8", wireframe: false, wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(getHandleWidth() + curve_Width / 5, getLongHandleHeight(), -curveHandleHeight - handleBaseExtrude / 2.5);
    mesh.rotateX(Math.PI / 2)
    // scene.add(mesh);

    return mesh;
}
//#endregion

//#region cross Hole
function fun34() {
    // Bolt Hole
    const boltHole1 = new THREE.Shape();
    const boltDiameter = getBackPlateWidth() / 4 + 10;
    boltHole1.absarc(0, 0, boltDiameter / 2, 0, Math.PI * 2, false);

    const crossDimension = getBackPlateWidth() / 8;
    const crossPath = new THREE.Shape();
    crossPath.moveTo(5, 5)
    crossPath.lineTo(5, crossDimension / 2);
    crossPath.lineTo(-5, crossDimension / 2);
    crossPath.lineTo(-5, 5);
    crossPath.lineTo(- crossDimension / 2, 5);
    crossPath.lineTo(- crossDimension / 2, -5);
    crossPath.lineTo(-5, -5);
    crossPath.lineTo(-5, -crossDimension / 2);
    crossPath.lineTo(5, -crossDimension / 2);
    crossPath.lineTo(5, -5);
    crossPath.lineTo(crossDimension / 2, -5);
    crossPath.lineTo(crossDimension / 2, 5);
    crossPath.lineTo(5, 5);
    crossPath.lineTo(5, crossDimension / 2);


    boltHole1.holes.push(crossPath);

    const baseExtrude = 50;
    const bolt = new THREE.ExtrudeGeometry(boltHole1, { depth: baseExtrude, bevelEnabled: false });
    const boltMat = new THREE.MeshPhysicalMaterial({ color: "#e4e6q9", wireframe: false });
    const boltPlate = new THREE.Mesh(bolt, boltMat);

    return boltPlate;
}
//#endregion

//#endregion


//#endregion

//#region Arrow Creation Function 35
function fun35(height, width) {
    const h = new AxesHelper(5);
    scene.add(h)
    const shape = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);

    const arrowHeight = height / 2;
    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x - width / 2, origin.y + arrowHeight)
    shape.lineTo(origin.x - width / 4, origin.y + arrowHeight)
    shape.lineTo(origin.x - width / 4, origin.y + height)
    shape.lineTo(origin.x - width / 2, origin.y + height)
    shape.lineTo(origin.x, origin.y + height + arrowHeight)
    shape.lineTo(origin.x + width / 2, origin.y + height)
    shape.lineTo(origin.x + width / 4, origin.y + height)
    shape.lineTo(origin.x + width / 4, origin.y + arrowHeight)
    shape.lineTo(origin.x + width / 2, origin.y + arrowHeight)
    shape.lineTo(origin.x, origin.y)
    const extrudeSettings = {
        bevelEnabled: true,
        steps: 1,
        depth: 2,
    };
    const arrow = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const arrowMaterial = new THREE.MeshPhysicalMaterial({
        color: "#a2afbd",
        wireframe: true,
    });
    const arrowMesh = new THREE.Mesh(arrow, arrowMaterial);
    arrowMesh.position.set(0, 0, 0)
    scene.add(arrowMesh);
}

//#endregion

//#region Hexagonal Shape Function 36

function fun36(diameter) {
    const shape = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0)
    shape.absarc(origin.x, origin.y, diameter / 2, 0, Math.PI * 2, true)

    const hexagonShape = new THREE.Path();
    const radius = diameter / 4;
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        if (i === 0) {
            hexagonShape.moveTo(x, y);
        } else {
            hexagonShape.lineTo(x, y);
        }
    }
    hexagonShape.closePath();

    shape.holes.push(hexagonShape)


    const extrudeSettings = {
        depth: 1,
        steps: 1,
        bevelEnabled: false,
    };
    const rectangleTopExtrude = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const rectangleTopMaterial = new THREE.MeshPhysicalMaterial({
        color: "#a2afbd",
        wireframe: false,
    });
    const rectangleTopMesh = new THREE.Mesh(rectangleTopExtrude, rectangleTopMaterial);
    scene.add(rectangleTopMesh)


    const points = hexagonShape.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const hexagonLine = new THREE.Line(geometry, material);

    scene.add(hexagonLine);
}

//#endregion

//#region Slicing of shape (fun 37 - 39 ) 


//#region  Data Variable Region
// Height of Rectangular shape
function RectangleShapeHeight() {
    return 50;
}

// Width of Rectangular shape
function RectangularShapeWidth() {
    return 30;
}

// Extrude Length of Rectangular shape
function rectangleExtrudeLength() {
    return 300;
}

// cutting Length of Rectangular shape from right 
function rectangularCutLength() {
    return 70;
}

// Height of Rectangular shape  
function rectangularCutHeight() {
    return 20;
}

//#endregion

//#region Main shape 

//#region  Type - 1 Fixed cut height 
function HollowRectangleShape_Type1() {
    // Hollow rectangle formation 
    const rectangleExtrudeShape = RectangleShape(RectangleShapeHeight() / 2);

    // Extrude settings for rectangular shape 
    const extrudeLength = rectangleExtrudeLength();
    const extrudeSettings = {
        depth: rectangleExtrudeLength(),
        steps: 1,
        bevelEnabled: false,
    };

    // rectangular Geometry , material and Mesh
    const rectangleTopExtrude = new THREE.ExtrudeGeometry(rectangleExtrudeShape, extrudeSettings);
    const rectangleTopMaterial = new THREE.MeshPhysicalMaterial({
        color: "#a2afbd",
        wireframe: false,
    });
    const rectangleTopMesh = new THREE.Mesh(rectangleTopExtrude, rectangleTopMaterial);
    AllCalculation(rectangleTopExtrude, extrudeLength, RectangleShapeHeight() / 2)
    scene.add(rectangleTopMesh);

}
//#endregion


//#region Type - 2  Variable cut height 
function HollowRectangleShape_Type2() {

    // Hollow rectangle formation 
    const rectangleExtrudeShape = RectangleShape(Math.min(rectangularCutHeight(), RectangleShapeHeight()));

    // Extrude settings for rectangular shape 
    const extrudeSettings = {
        depth: rectangleExtrudeLength(),
        steps: 1,
        bevelEnabled: false,
    };

    // rectangular Geometry , material and Mesh
    const rectangleTopExtrude = new THREE.ExtrudeGeometry(rectangleExtrudeShape, extrudeSettings);
    const rectangleTopMaterial = new THREE.MeshPhysicalMaterial({
        color: "#a2afbd",
        wireframe: false,
    });
    const rectangleTopMesh = new THREE.Mesh(rectangleTopExtrude, rectangleTopMaterial);
    AllCalculation(rectangleTopExtrude, rectangleExtrudeLength(), rectangularCutHeight())
    scene.add(rectangleTopMesh);

}
//#endregion


//#region Type - 3  Multiple slices

const leftLinePoints = [
    new THREE.Vector3(0, 0, 0),  // left line start coordinate 
    new THREE.Vector3(0, 50, 100),  // left line end coordinate 
];

const rightLinePoints = [
    new THREE.Vector3(0, 0, 200),   // right line start coordinate 
    new THREE.Vector3(0, 51, 300),   // right line end coordinate 
];

// Create a CatmullRomCurve3 curve
const leftCurve = new THREE.CatmullRomCurve3(leftLinePoints);
const rightCurve = new THREE.CatmullRomCurve3(rightLinePoints);

// Generate the Cut Line from the given Vertices
const leftCurvePoints = leftCurve.getPoints(100);
leftCurvePoints.forEach(v => {
    // top edge for end point
    if (Math.round(v.y) == RectangleShapeHeight() && v.z >= 0) {
        leftLinePoints[1].y = RectangleShapeHeight();
        leftLinePoints[1].z = v.z;
    }
    // left edge for end point
    if (Math.round(v.z) == 0) {
        leftLinePoints[1].y = v.y;
        leftLinePoints[1].z = 0;
    }
})
leftCurvePoints.forEach(v => {
    // left edge for start point
    if (Math.round(v.z) == 0 && leftLinePoints[1].y == RectangleShapeHeight()) {
        leftLinePoints[0].y = v.y;
        leftLinePoints[0].z = 0;
    }
    // down edge for start point
    if (Math.round(v.y) == 0) {
        leftLinePoints[0].y = 0;
        leftLinePoints[0].z = v.z;
    }
})

const rightCurvePoints = rightCurve.getPoints(100);
rightCurvePoints.forEach(v => {
    // top edge for end point
    if (Math.round(v.y) == RectangleShapeHeight() && v.z <= rectangleExtrudeLength()) {
        rightLinePoints[1].y = RectangleShapeHeight();
        rightLinePoints[1].z = v.z;
    }
    // right edge for end point
    if (Math.round(v.z) == rectangleExtrudeLength()) {
        rightLinePoints[1].y = v.y;
        rightLinePoints[1].z = rectangleExtrudeLength();
    }
})
rightCurvePoints.forEach(v => {
    // right edge for start point
    if (Math.round(v.z) == rectangleExtrudeLength() && rightLinePoints[1].y == RectangleShapeHeight()) {
        // console.log(Math.round(v.x) , Math.round(v.y) , Math.round(v.z));
        rightLinePoints[0].y = v.y;
        rightLinePoints[0].z = rectangleExtrudeLength();
    }
    // down edge for start point
    if (Math.round(v.y) == 0) {
        // console.log(Math.round(v.x) , Math.round(v.y) , Math.round(v.z));
        rightLinePoints[0].y = 0;
        rightLinePoints[0].z = v.z;
    }
})

const leftGeometry = new THREE.BufferGeometry().setFromPoints(leftCurvePoints);
const rightGeometry = new THREE.BufferGeometry().setFromPoints(rightCurvePoints);
// Create a material for the line
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
// Create the line object
const rightLine = new THREE.Line(rightGeometry, material);
const leftLine = new THREE.Line(leftGeometry, material);

// Add the line to the scene
// scene.add(leftLine);
// scene.add(rightLine);
function HollowRectangleShape_Type3() {
    const rectangleExtrudeShape = RectangleShape(RectangleShapeHeight() / 2);

    // Extrude settings for rectangular shape 
    const extrudeLength = rectangleExtrudeLength();
    const extrudeSettings = {
        depth: rectangleExtrudeLength(),
        steps: 1,
        bevelEnabled: false,
    };

    // rectangular Geometry , material and Mesh
    const rectangleTopExtrude = new THREE.ExtrudeGeometry(rectangleExtrudeShape, extrudeSettings);
    const rectangleTopMaterial = new THREE.MeshPhysicalMaterial({
        color: "#a2afbd",
        wireframe: false,
    });
    const rectangleTopMesh = new THREE.Mesh(rectangleTopExtrude, rectangleTopMaterial);
    RectangularShapeCalculation(rectangleTopExtrude, extrudeLength);
    scene.add(rectangleTopMesh);

}
//#endregion

// Edge cutting calculation 
function AllCalculation(geometry, extrudeLength, variableHeight) {
    const positionAttribute = geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);
        // Adjust upper-rightmost edge
        if (y > variableHeight && z == extrudeLength) {
            positionAttribute.setXYZ(i, x, y, z - Math.min(rectangularCutLength(), rectangleExtrudeLength()));
        }

        // Adjust lower-rightmost edge
        if (y < variableHeight && z == extrudeLength) {
            positionAttribute.setXYZ(i, x, y, z - Math.min(rectangularCutLength(), rectangleExtrudeLength()));
        }
    }

}

// Edge cutting calculation 
function RectangularShapeCalculation(geometry, extrudeLength) {
    console.log("Left Line cutting vertices ", leftLinePoints[0], leftLinePoints[1]);
    console.log("Right Line cutting vertices ", rightLinePoints[0], rightLinePoints[1]);
    const positionAttribute = geometry.attributes.position;

    const leftStartCoordinate = leftLinePoints[0];
    const leftEndCoordinate = leftLinePoints[1];

    const rightStartCoordinate = rightLinePoints[0];
    const rightEndCoordinate = rightLinePoints[1];

    for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);

        // LEFT LINE CUTTING 
        if (leftStartCoordinate.y <= 0 && leftStartCoordinate.z >= 0 && leftStartCoordinate.z < rightStartCoordinate.z) {
            if (z == 0 && (y == 0 || y == RectangularShapeWidth() / 20)) {
                if (y == 0) positionAttribute.setXYZ(i, x, leftStartCoordinate.y, leftStartCoordinate.z);
                if (y == RectangularShapeWidth() / 20) positionAttribute.setXYZ(i, x, leftStartCoordinate.y + RectangularShapeWidth() / 20, leftStartCoordinate.z + RectangularShapeWidth() / 20);
            }
        }
        if (leftEndCoordinate.y > 0 && leftEndCoordinate.z >= 0) {
            if (y == RectangleShapeHeight() / 2 && z == 0) {
                positionAttribute.setXYZ(i, x, leftEndCoordinate.y, leftEndCoordinate.z);
            }

            if (leftEndCoordinate.z != 0) {
                if (z == 0 && (y == RectangleShapeHeight() || y == RectangleShapeHeight() - RectangularShapeWidth() / 20)) {
                    if (y == RectangleShapeHeight()) positionAttribute.setXYZ(i, x, leftEndCoordinate.y, leftEndCoordinate.z);
                    if (y == RectangleShapeHeight() - RectangularShapeWidth() / 20) positionAttribute.setXYZ(i, x, leftEndCoordinate.y - RectangularShapeWidth() / 20, leftEndCoordinate.z + RectangularShapeWidth() / 20);

                }
            }
        }
        if (leftStartCoordinate.y > 0 && leftStartCoordinate.z == 0) {
            if (y == RectangleShapeHeight() / 2 && z == 0) {
                positionAttribute.setXYZ(i, x, leftStartCoordinate.y, leftStartCoordinate.z);
            }
        }


        // RIGHT LINE CUTTING 

        if (rightStartCoordinate.y <= 0 && rightStartCoordinate.z <= rectangleExtrudeLength() && rightStartCoordinate.z > leftStartCoordinate.z) {
            if (z == rectangleExtrudeLength() && (y == 0 || y == RectangularShapeWidth() / 20)) {
                positionAttribute.setXYZ(i, x, rightStartCoordinate.y, rightStartCoordinate.z);
            }
            if (z == rectangleExtrudeLength() && y == RectangleShapeHeight() / 2) {
                positionAttribute.setXYZ(i, x, rightEndCoordinate.y, rightEndCoordinate.z);
            }
        }

        if (rightEndCoordinate.y >= RectangleShapeHeight() && rightEndCoordinate.z <= rectangleExtrudeLength() && rightEndCoordinate.z > leftEndCoordinate.z) {
            if (z == rectangleExtrudeLength() && (y == RectangleShapeHeight() || y == RectangleShapeHeight() - RectangularShapeWidth() / 20)) {
                positionAttribute.setXYZ(i, x, rightEndCoordinate.y, rightEndCoordinate.z);
            }
        }

        if (rightStartCoordinate.y > 0 && rightStartCoordinate.z == rectangleExtrudeLength()) {
            if (z == rectangleExtrudeLength() && y == RectangleShapeHeight() / 2) {
                positionAttribute.setXYZ(i, x, rightStartCoordinate.y, rightStartCoordinate.z);
            }
        }
    }

}

// Rectangle shape geometry
function RectangleShape(variableHeight) {
    const shape = new THREE.Shape();
    const height = RectangleShapeHeight();
    const changeHeight = variableHeight;
    const width = RectangularShapeWidth();
    const offset = width / 20;

    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x, origin.y + changeHeight);
    shape.lineTo(origin.x, origin.y + height);
    shape.lineTo(origin.x + width, origin.y + height);
    shape.lineTo(origin.x + width, origin.y + changeHeight);
    shape.lineTo(origin.x + width, origin.y);
    shape.lineTo(origin.x + 1, origin.y);
    shape.lineTo(origin.x + 1, origin.y + offset);
    shape.lineTo(origin.x + width - offset, origin.y + offset);
    shape.lineTo(origin.x + width - offset, origin.y + changeHeight);
    shape.lineTo(origin.x + width - offset, origin.y + height - offset);
    shape.lineTo(origin.x + offset, origin.y + height - offset);
    shape.lineTo(origin.x + offset, origin.y + changeHeight);
    shape.lineTo(origin.x + offset, origin.y);

    return shape;
}

//#endregion


//#endregion


//#region Main Frame formation 

//#region Raycast
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const polygonVertices = [];
const vectorAngles = [];
const vertexAngles = [];
const extrudeStartPoints = [];
const extrudeEndPoints = [];
const cuttingLinePoints = []
const extrudeDirectionsByEdge = [];
const rectangleHeight = 1;

const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMaterial = new THREE.MeshBasicMaterial({
    visible: false,
    color: "red",
});
const drawingPlane = new THREE.Mesh(planeGeometry, planeMaterial);
drawingPlane.scale.set(0.1, 0.1, 0.1);
drawingPlane.position.set(0, 0, 5);
scene.add(drawingPlane);
//#endregion

function drawCircleAt(point) {
    const circle = new THREE.Mesh(
        new THREE.CircleGeometry(0.1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    circle.position.copy(point);
    scene.add(circle);
}

function extrudeFaceBetween(startPoint, endPoint) {
    const shape = new THREE.Shape();
    const depth = 0;
    const height = rectangleHeight;
    shape.moveTo(0, 0);
    shape.lineTo(depth, 0);
    shape.lineTo(depth, height);
    shape.lineTo(0, height);
    shape.lineTo(0, 0);

    const path = new THREE.LineCurve3(startPoint, endPoint);
    const extrudeSettings = {
        steps: 1,
        bevelEnabled: false,
        extrudePath: path,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);

    const direction = new THREE.Vector3().subVectors(endPoint, startPoint);
    let dominantAxis;
    if (Math.abs(direction.x) > Math.abs(direction.y)) {
        dominantAxis = direction.x > 0 ? "x" : "-x";
    } else if (Math.abs(direction.y) > Math.abs(direction.x)) {
        dominantAxis = direction.y > 0 ? "y" : "-y";
    }

    extrudeDirectionsByEdge.push(dominantAxis);

    const positionAttribute = geometry.attributes.position;
    const uniqueVerticesSet = new Set();
    const uniqueVertices = [];
    for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);
        const vertex = JSON.stringify([x, y, z]);
        if (!uniqueVerticesSet.has(vertex)) {
            uniqueVerticesSet.add(vertex);
            uniqueVertices.push([x, y, z]);
        }
    }

    extrudeStartPoints.push(uniqueVertices[2]);
    extrudeEndPoints.push(uniqueVertices[0]);


    // console.log(geometry.attributes.position);
    // const contour = geometry.getPoints(50);

    // const lineSegmentMaterial = new THREE.LineBasicMaterial({ color: "white" });
    // const frontEdges = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(contour), lineSegmentMaterial);
    // mesh.add(frontEdges);

    scene.add(mesh);
}
// debugger;
function calculateAngles() {
    if (polygonVertices.length < 3) return;
    console.log(polygonVertices);

    for (let i = 1; i < polygonVertices.length; i++) {
        const prevVertex =
            polygonVertices[
            (i - 1 + polygonVertices.length) % polygonVertices.length
            ];
        const currentVertex = polygonVertices[i];
        const nextVertex = (i != polygonVertices.length - 1) ? (polygonVertices[(i + 1) % polygonVertices.length]) : (polygonVertices[1]);

        // This is the point where the angle is calculated using th side of the rectangle shape
        const pointLeft = new THREE.Vector3(...extrudeStartPoints[i - 1]);
        const commonPoint = new THREE.Vector3(...polygonVertices[i]);
        const pointRight = new THREE.Vector3(...extrudeEndPoints[i % extrudeEndPoints.length]);

        const vectorAvertexAngle = new THREE.Vector3().subVectors(
            pointLeft,
            commonPoint
        );
        const vectorBvertexAngle = new THREE.Vector3().subVectors(
            pointRight,
            commonPoint
        );
        const vertexAngle = vectorAvertexAngle.angleTo(vectorBvertexAngle);
        vertexAngles.push(vertexAngle);

        // Ends here

        const vectorA = new THREE.Vector3().subVectors(prevVertex, currentVertex);
        const vectorB = new THREE.Vector3().subVectors(nextVertex, currentVertex);
        const angle = vectorA.angleTo(vectorB);
        vectorAngles.push(angle);
        console.log(i, prevVertex, currentVertex, nextVertex, vertexAngle * (180 / Math.PI));
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 64;
        const context = canvas.getContext("2d");
        context.fillStyle = "rgba(0, 0, 0, 0.7)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "24px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(
            (vertexAngle * (180 / Math.PI)).toFixed(1) + "°",
            canvas.width / 2,
            canvas.height / 2 + 8
        );

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.copy(currentVertex);
        sprite.position.z += 0.1;
        sprite.scale.set(0.5, 0.25, 1);
        sprite.userData.isAngleLabel = true;
        scene.add(sprite);

        const bisector = new THREE.Vector3().addVectors(vectorA.normalize(), vectorB.normalize()).normalize();

        const arrowLength = rectangleHeight * 1.15;
        const arrowEnd = new THREE.Vector3().addVectors(currentVertex, bisector.multiplyScalar(arrowLength));
        cuttingLinePoints.push(arrowEnd);
        const arrowLineGeometry = new THREE.BufferGeometry().setFromPoints([currentVertex, arrowEnd]);
        const arrowLineMaterial = new THREE.LineBasicMaterial({
            color: 0xff0000,
        });
        const arrowLine = new THREE.Line(arrowLineGeometry, arrowLineMaterial);
        // scene.add(arrowLine);
    }
}

function findExtrudePath() {
    for (let i = 0; i < polygonVertices.length - 1; i++) {
        extrudeFaceBetween(polygonVertices[i], polygonVertices[i + 1]);
    }
}

function stepFinal() {
    cuttingLinePoints.forEach(e => {
        drawCircleAt(e);
    });
    let faceIndex = 0;
    scene.traverse((child) => {
        if (child.isMesh && child.geometry instanceof THREE.ExtrudeGeometry) {
            const geometry = child.geometry;
            const positionAttribute = geometry.attributes.position;
            for (let i = 0; i < positionAttribute.count; i++) {
                const x = positionAttribute.getX(i);
                const y = positionAttribute.getY(i);
                const z = positionAttribute.getZ(i);

                const start = extrudeStartPoints[faceIndex];
                const end = extrudeEndPoints[faceIndex];

                // const distanceToCut = extrusionHeight * Math.tan(vectorAngles[faceIndex] / 2);
                if (x === start[0] && y === start[1] && z === start[2]) {
                    positionAttribute.setXYZ(i, cuttingLinePoints[faceIndex].x, cuttingLinePoints[faceIndex].y, z);
                }

                if (x === end[0] && y === end[1] && z === end[2]) {
                    positionAttribute.setXYZ(i, cuttingLinePoints[(cuttingLinePoints.length - 1 + faceIndex) % cuttingLinePoints.length].x, cuttingLinePoints[(cuttingLinePoints.length - 1 + faceIndex) % cuttingLinePoints.length].y, z);
                }
            }
            faceIndex++;
        }
    });

    // console.log(extrudeStartPoints);


}
let toStop = false;
function onClick(event) {
    camera.position.set(0, 0, 20);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(drawingPlane);
    if (intersects.length > 0) {
        const clickedPoint = intersects[0].point;
        polygonVertices.push(clickedPoint);

        const isClosed =
            polygonVertices.length > 1 &&
            parseFloat(clickedPoint.x.toFixed(0)) ===
            parseFloat(polygonVertices[0].x.toFixed(0)) &&
            parseFloat(clickedPoint.y.toFixed(0)) ===
            parseFloat(polygonVertices[0].y.toFixed(0)) &&
            parseFloat(clickedPoint.z.toFixed(0)) ===
            parseFloat(polygonVertices[0].z.toFixed(0));

        if (isClosed) {
            console.log("Got the starting point");
            toStop = true;
            polygonVertices[polygonVertices.length - 1] = polygonVertices[0];
            findExtrudePath();
            calculateAngles();
            stepFinal();
        }

        if (!toStop) drawCircleAt(clickedPoint);
    }
}

function onClick1() {
    const verticesArray = [
        [4.619986534118652, -3.9229650497436523, 5],
        [6.302168846130371, 2.4965851306915283, 5],
        [0.9129076600074768, 7.202646732330322, 5],
        [-5.784069061279297, 5.9911041259765625, 5],
        [-7.832438945770264, 1.6397818326950073, 5],
        [-5.732290267944336, -2.1260156631469727, 5],
        [-0.44144290685653687, -5.40511417388916, 5],
        [4.619986534118652, -3.9229650497436523, 5],
    ];
    verticesArray.forEach((vertex) => {
        const point = new THREE.Vector3(...vertex);
        drawCircleAt(point)
        polygonVertices.push(point);
    });
    findExtrudePath();
    calculateAngles();
    stepFinal();
}
window.addEventListener("click", onClick, false);

console.log(scene.children);

//#endregion


//#region helper
document.addEventListener('keyup', (event) => {
    const key = event.key;
    console.log(key);

    switch (key) {
        case '1':
            fun1();
            break;
        case '2':
            fun2();
            break;
        case '3':
            fun3();
            break;
        case '4':
            fun4();
            break;
        case '5':
            fun5();
            break;
        case '6':
            fun6();
            break;
        case '7':
            fun8();
            break;
        case '9':
            fun9();
            break;
        default:
            console.log("No function selected");
    }
});
//#endregion

//#region render
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
//#endregion

HollowRectangleShape_Type3();
