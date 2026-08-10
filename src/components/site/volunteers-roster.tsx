"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRightIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getTeams } from "@/lib/site-data";
import type { Locale } from "@/i18n/routing";

const header =
  "border-b-sticker border-line-strong bg-tg-yellow px-6 pt-5 font-heading font-bold uppercase text-foreground";

/**
 * Volunteers roster card: lists the teams, and drills into a single
 * team's full name list on click.
 */
export function VolunteersRoster() {
  const [selected, setSelected] = useState<number | null>(null);
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const teams = getTeams(locale);
  const detail = selected != null ? teams[selected] : null;

  if (detail) {
    return (
      <Card variant="sticker" className="gap-0">
        <div className={`${header} pb-3.5`}>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="cursor-pointer pb-3 text-left font-body text-xs font-normal normal-case text-foreground-secondary hover:text-brand-hover"
          >
            ← {t("volunteers.back")}
          </button>
          <div className="text-2xl leading-snug">
            {t(`volunteers.teams.${detail.key}`)}
          </div>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto px-6 py-4.5">
          {detail.names.map((n) => (
            <span key={n} className="text-sm leading-normal text-foreground-secondary">
              {n}
            </span>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="sticker" className="gap-0">
      <div className={`${header} pb-4`}>
        <div className="text-xl leading-snug">{t("volunteers.rosterTitle")}</div>
      </div>
      <div className="overflow-y-auto">
        {teams.map((team, i) => (
          <button
            key={team.key}
            type="button"
            onClick={() => setSelected(i)}
            className="flex w-full cursor-pointer items-center justify-between border-b-2 border-line-subtle px-6 py-4 text-left text-foreground hover:bg-surface-wash"
          >
            <span className="font-heading text-sm leading-normal font-bold uppercase">
              {t(`volunteers.teams.${team.key}`)}
            </span>
            <ChevronRightIcon className="size-4 text-brand-hover" />
          </button>
        ))}
      </div>
    </Card>
  );
}
