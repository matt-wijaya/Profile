"use client";

import { BriefcaseBusiness, FileText, FolderGit2, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Profile } from "@/data/profile";
import { isPlaceholderLink } from "@/lib/utils";

import { CtaLink } from "./cta-link";
import { TemporalSection, useTemporal } from "./temporal-archive";

type ContactFooterProps = {
  profile: Profile;
};

type TransmissionState = "idle" | "establishing" | "acquired";

export function ContactFooter({ profile }: ContactFooterProps) {
  const year = new Date().getFullYear();
  const { recoverFragment } = useTemporal();
  const [transmissionState, setTransmissionState] = useState<TransmissionState>("idle");
  const transmissionTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const channels = [
    {
      href: `mailto:${profile.email}`,
      label: profile.email,
      icon: Mail,
      channel: "MAIL / 01",
      cursorLabel: "TRANSMIT",
    },
    {
      href: profile.github,
      label: "GitHub",
      icon: FolderGit2,
      channel: "SOURCE / 02",
      cursorLabel: "EXIT ARCHIVE ↗",
    },
    {
      href: profile.linkedin,
      label: "LinkedIn",
      icon: BriefcaseBusiness,
      channel: "PROFILE / 03",
      cursorLabel: "EXIT ARCHIVE ↗",
    },
  ];

  const transmit = () => {
    if (transmissionTimerRef.current) window.clearTimeout(transmissionTimerRef.current);
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    setTransmissionState("establishing");
    recoverFragment(4);
    transmissionTimerRef.current = window.setTimeout(() => setTransmissionState("acquired"), 180);
    resetTimerRef.current = window.setTimeout(() => setTransmissionState("idle"), 1800);
  };

  useEffect(
    () => () => {
      if (transmissionTimerRef.current) window.clearTimeout(transmissionTimerRef.current);
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    },
    [],
  );

  const transmissionLabel =
    transmissionState === "establishing"
      ? "ESTABLISHING OUTBOUND LINK..."
      : transmissionState === "acquired"
        ? "CHANNEL ACQUIRED"
        : "OUTBOUND CHANNEL READY";

  return (
    <TemporalSection as="footer" id="contact" attachId={false} className="pb-8 pt-10 sm:pb-10 sm:pt-14">
      <div className="container-grid">
        <div id="contact" className="contact-monitor section-anchor">
          <span className="monitor-handle" aria-hidden="true" />
          <div className="monitor-shell">
            <span className="monitor-screw monitor-screw--tl" aria-hidden="true" />
            <span className="monitor-screw monitor-screw--tr" aria-hidden="true" />
            <span className="monitor-screw monitor-screw--bl" aria-hidden="true" />
            <span className="monitor-screw monitor-screw--br" aria-hidden="true" />

            <div className="monitor-bezel">
              <div className="monitor-screen">
                <div className="monitor-interface">
                  <div className="monitor-interface-header">
                    <div>
                    </div>
                    <div className="monitor-channel-state" aria-live="polite">
                      <span aria-hidden="true" />
                      {transmissionLabel}
                    </div>
                  </div>

                  <div className="monitor-interface-grid">
                    <div className="monitor-message">
                      <h2 className="display-font text-balance">Got something interesting in mind?</h2>
                      <p className="monitor-copy">
                        If it needs research, interaction design, interface craft, or someone willing to actually build the thing,
                        send it my way.
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="monitor-email"
                        data-cursor-label="TRANSMIT"
                        onClick={transmit}
                      >
                        <span>DIRECT LINE</span>
                        <strong>{profile.email}</strong>
                      </a>
                      <CtaLink
                        href={`mailto:${profile.email}`}
                        label="SEND TRANSMISSION"
                        emphasis="primary"
                        className="monitor-transmit"
                        cursorLabel="TRANSMIT"
                        onActivate={transmit}
                      />
                    </div>

                    <div className="monitor-directory" aria-label="Communication directory">
                      <div className="monitor-directory-heading" aria-hidden="true">
                        <span>CHANNEL</span>
                        <span>DESTINATION</span>
                        <span>STATE</span>
                      </div>
                      {channels.map(({ href, label, icon: Icon, channel, cursorLabel }) => {
                        const placeholder = isPlaceholderLink(href);
                        const content = (
                          <>
                            <span className="monitor-channel-code">
                              <Icon aria-hidden="true" />
                              {channel}
                            </span>
                            <strong>{label}</strong>
                            <span className={`monitor-record-state ${placeholder ? "" : "monitor-record-state--ready"}`}>
                              {placeholder ? "REPLACE" : "READY"}
                            </span>
                          </>
                        );

                        return placeholder ? (
                          <div key={channel} className="monitor-record monitor-record--disabled">
                            {content}
                          </div>
                        ) : (
                          <a
                            key={channel}
                            href={href}
                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                            className="monitor-record"
                            data-cursor-label={cursorLabel}
                            onClick={href.startsWith("mailto:") ? transmit : undefined}
                          >
                            {content}
                          </a>
                        );
                      })}

                      {profile.cvAvailable ? (
                        <a
                          href={profile.cv}
                          target="_blank"
                          rel="noreferrer"
                          className="monitor-record"
                          data-cursor-label="EXIT ARCHIVE ↗"
                        >
                          <span className="monitor-channel-code">
                            <FileText aria-hidden="true" />
                            DOCUMENT / 04
                          </span>
                          <strong>CV PDF</strong>
                          <span className="monitor-record-state monitor-record-state--ready">READY</span>
                        </a>
                      ) : (
                        <div className="monitor-record monitor-record--disabled">
                          <span className="monitor-channel-code">
                            <FileText aria-hidden="true" />
                            DOCUMENT / 04
                          </span>
                          <strong>CV PDF</strong>
                          <span className="monitor-record-state">REPLACE</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="monitor-interface-footer">
                    <span>{`MATTHEW WIJAYA // ${profile.location.toUpperCase()} // ${year}`}</span>
                    <span>PORTFOLIO BUILD: STABLE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="monitor-console" aria-hidden="true">
              <div className="monitor-vents" />
              <div className="monitor-serial">
                <span>ARCHIVE EQUIPMENT</span>
                <strong>INTF C-05 / MW</strong>
              </div>
              <div className="monitor-controls">
                <span className="monitor-lamp" />
                <span className="monitor-dial" />
                <span className="monitor-dial monitor-dial--small" />
              </div>
            </div>
          </div>
          <span className="monitor-foot monitor-foot--left" aria-hidden="true" />
          <span className="monitor-foot monitor-foot--right" aria-hidden="true" />
        </div>
      </div>
    </TemporalSection>
  );
}
