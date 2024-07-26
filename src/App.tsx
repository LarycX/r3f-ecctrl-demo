import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import { Suspense } from "react";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import CharacterModel from "./components/CharacterModel";
import SceneModel from "./components/Scene";
import { CHARACTER_MODEL_URL } from "./Constants.ts";

function App() {
 //人物动作预设
  const animationSet = {
    idle: "CharacterArmature|Idle",//闲置时动画
    walk: "CharacterArmature|Walk",//行走动画
    run: "CharacterArmature|Run",//跑步动画
    jump: "CharacterArmature|Jump",//跳跃动画
    jumpIdle: "CharacterArmature|Jump_Idle",//跳跃动画
    jumpLand: "CharacterArmature|Jump_Land",//落地动画
    fall: "CharacterArmature|Duck",//坠落滞空动画
    action1: "CharacterArmature|Wave",//挥手动画
    action2: "CharacterArmature|Death",//死亡动画
    action3: "CharacterArmature|HitReact",//承受攻击动画
    action4: "CharacterArmature|Punch",//攻击动画
  };
  //键盘控制预设
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];

  return (
    <>
      <Canvas
      shadows
       onPointerDown={(e) => {
        (e.target as HTMLCanvasElement).requestPointerLock();
      }} 
  //点击canvas锁定,移动鼠标直接转动视角，,类似pointerLockControl

>
        <directionalLight
          intensity={2.5}
          color={"#FFFFFF"}
          castShadow
          shadow-bias={-0.00006}
          position={[-5, 25, -1]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-top={30}
          shadow-camera-right={30}
          shadow-camera-bottom={-30}
          shadow-camera-left={-30}
        />
        <hemisphereLight args={[0x8dc1de, 0x00668d, 1.5]} />

       <Suspense fallback={null}>
          <Physics timeStep="vary">
            <KeyboardControls 
                map={keyboardMap}
              >
           <Ecctrl
                // camInitDis={-0.01} // 相机初始位置
                // camMinDis={-0.01} // 相机最小缩放距离（最近的位置）
                // camFollowMult={100} // 这里给一个大数字，使相机跟随角色的动作即时
                // turnVelMultiplier={1} // 转向速度与移动速度相同
                // turnSpeed={100} // 给一个大的转向速度以避免转向延迟
                animated={ true }   // 启用动画
                mode="CameraBasedMovement" // 以第一人称视角
              >
                <EcctrlAnimation //应用ecctrl动画
                  characterURL={CHARACTER_MODEL_URL} //角色模型路径
                  animationSet={animationSet} //应用动作预设
                >
                  <CharacterModel visible={true}/>
                </EcctrlAnimation>
              </Ecctrl>
            </KeyboardControls>
            <RigidBody type="fixed" colliders="trimesh" ccd>
              <SceneModel />
            </RigidBody>
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
