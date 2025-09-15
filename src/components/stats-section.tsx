"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [users, setUsers] = useState(0);
  const [meetings, setMeetings] = useState(0);

  useEffect(() => {
    if (isInView) {
      const endUsers = 1500000;
      const endMeetings = 3579;

      const duration = 2000;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);

      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;

        setUsers(Math.floor(progress * endUsers));
        setMeetings(Math.floor(progress * endMeetings));

        if (frame === totalFrames) clearInterval(counter);
      }, frameRate);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="py-6 bg-gray-50"
      style={{ backgroundImage: "url('/images/landing_page_header_meeting.png')" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 justify-items-center max-w-6xl mx-auto">
          {/* Người dùng */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{users.toLocaleString()}+</div>
              <div className="text-gray-600 text-lg">Người dùng tin tưởng</div>
            </div>
          </motion.div>

          {/* Cuộc họp */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {meetings.toLocaleString()}+
              </div>
              <div className="text-gray-600 text-lg">Cuộc họp mỗi ngày</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
