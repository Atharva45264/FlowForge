"use client";

import { useEffect, useState } from "react";

import { AppsCluster } from "./apps-cluster";
import { Explosion } from "./explosion";
import { FlowForgeCard } from "./flowforge-card";
import { FeatureOrbit } from "./feature-orbit";

export function MergingApp() {
  const [merge, setMerge] = useState(false);
  const [explode, setExplode] = useState(false);
  const [showFlowForge, setShowFlowForge] = useState(false);
  const [showOrbit, setShowOrbit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setMerge(true);
    }, 1800);

    const t2 = setTimeout(() => {
      setExplode(true);
    }, 3000);

    const t3 = setTimeout(() => {
      setExplode(false);
      setShowFlowForge(true);
    }, 3600);

    const t4 = setTimeout(() => {
      setShowOrbit(true);
    }, 4300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative mx-auto mt-10 h-155 w-190">

      {/* Apps */}

      <AppsCluster merge={merge} />

      {/* Explosion */}

      <Explosion show={explode} />

      {/* Center Card */}

      <FlowForgeCard show={showFlowForge} />

      {/* Orbit */}

      {showOrbit && (
        <FeatureOrbit />
      )}

    </div>
  );
}