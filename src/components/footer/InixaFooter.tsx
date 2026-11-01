import React from 'react'
import { DoodleCrewFooter } from './DoodleCrewFooter'

/**
 * Official Site Footer — Living Sketchbook Doodle Crew stamped with "INIXA LAB"
 */
export const InixaFooter: React.FC = () => {
  return (
    <DoodleCrewFooter
      wordmark="INIXA LAB"
      brand="INIXA LABS"
      blurb="Building tactile liquid-glass Android flagships with bit-perfect audio, 120Hz optics, and zero telemetry. Real software on real hardware."
      tagline="Liquid glass optics & audiophile bit-perfect flagships for Android."
      preset="inixa"
      height="720px"
    />
  )
}

export default InixaFooter
