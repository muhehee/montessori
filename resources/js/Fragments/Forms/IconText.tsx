import Icon from 'components/Icon'
import React, { ReactNode } from 'react'

interface Props {
    text?: string | any
    icon: string | ReactNode
    className?: string
    iconClass?: string
}

function IconText(props: Props) {
    const {text, icon, className, iconClass} = props

    return (
        <div className={`flex items-center ${className}`}>
            {typeof icon == 'string' ? <Icon name={icon} className={`mr-12px flex-shrink-0 ${iconClass}`} /> : icon}
            {text}
        </div>
    )
}

export default IconText
