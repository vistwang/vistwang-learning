import React, { Component } from 'react'

import { Icon } from '../../../components/m1ui'
import { CampaignTypes, CampaignStatus } from '../../../base/enums'

import CampaignMenuItem from './CampaignMenuItem'

const CampaignMenu = ({onRequestList, info, statistics}) => {
  const isAutomatic = CampaignTypes.AUTOMATIC === info.type
  const isSingle = CampaignTypes.SINGLE === info.type
  const isRunning = CampaignStatus.RUNNING === info.status
  const isDraft = CampaignStatus.DRAFT === info.status
  const isStop = CampaignStatus.STOP === info.status
  const isOwn = info.own
  const isFolder = !!info.folderId
  const isAll = !isAutomatic && !isSingle && !isRunning && !isDraft && !isStop && !isOwn && !isFolder
	return (
    <div className="nav-group nav-campaign">
			<ul className="m1-nav nav-header">
        <CampaignMenuItem 
          title="所有营销活动"
          count={statistics.all}
          onSelect={e => onRequestList({})}
          isSelect={isAll}
        />
      </ul>
			<ul className="m1-nav nav-menu">
        <CampaignMenuItem 
          title="自动营销活动"
          icon="automatic"
          count={statistics.auto}
          onSelect={e => onRequestList({type: CampaignTypes.AUTOMATIC})}
          isSelect={isAutomatic}
        />
        <li>
          <ul className="m1-subnav">
            <CampaignMenuItem 
              title="正在运行"
              icon="function"
              count={statistics.running}
              onSelect={e => onRequestList({status: CampaignStatus.RUNNING})}
              isSelect={isRunning}
            />
            <CampaignMenuItem 
              title="草稿"
              icon="draft"
              count={statistics.draft}
              onSelect={e => onRequestList({status: CampaignStatus.DRAFT})}
              isSelect={isDraft}
            />
            <CampaignMenuItem 
              title="停止运行"
              icon="suspend"
              count={statistics.stop}
              onSelect={e => onRequestList({status: CampaignStatus.STOP})}
              isSelect={isStop}
            />
          </ul>
        </li>
        <CampaignMenuItem 
          title="单次营销活动"
          icon="single"
          count={statistics.oneTime}
          onSelect={e => onRequestList({type: CampaignTypes.SINGLE})}
          isSelect={isSingle}
        />
        <CampaignMenuItem 
          title="我创建的"
          icon="user"
          count={statistics.own}
          onSelect={e => onRequestList({current: true})}
          isSelect={isOwn}
        />
      </ul>
    </div>
	)
}

export default CampaignMenu