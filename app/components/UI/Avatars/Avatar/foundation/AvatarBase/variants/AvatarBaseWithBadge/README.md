# AvatarBaseWithBadge

The AvatarBaseWithBadge component is a base-variant component of Metamask's [AvatarBase](../../AvatarBase.tsx). It contains all the shared configurations and styling amongst all AvatarBase variants, includes Badge information, and should not be used unless creating a new type of AvatarBase.

## Props

This component extends the [AvatarBaseBase](../../foundation/AvatarBaseBase/AvatarBaseBase.tsx) component.

### `size`

Optional enum to select between size variants.

| <span style="color:gray;font-size:14px">TYPE</span> | <span style="color:gray;font-size:14px">REQUIRED</span> | <span style="color:gray;font-size:14px">DEFAULT</span> |
| :-------------------------------------------------- | :------------------------------------------------------ | :----------------------------------------------------- |
| [AvatarSizes](../../Avatar.types.ts)          | No                                                     | Md                                                     |

### `backgroundColor`

Optional enum to add color to the background of the Avatar.

| <span style="color:gray;font-size:14px">TYPE</span> | <span style="color:gray;font-size:14px">REQUIRED</span> |
| :-------------------------------------------------- | :------------------------------------------------------ |
| ColorValue                                              | No                                                     |

### `isBadgeIncluded`

Optional boolean to select if badge should be included.

| <span style="color:gray;font-size:14px">TYPE</span> | <span style="color:gray;font-size:14px">REQUIRED</span> | <span style="color:gray;font-size:14px">DEFAULT</span> |
| :-------------------------------------------------- | :------------------------------------------------------ | :----------------------------------------------------- |
| boolean                   | Yes                                                     | true                                                     |

### `badgeProps`

Enum for the Badge props.

| <span style="color:gray;font-size:14px">TYPE</span> | <span style="color:gray;font-size:14px">REQUIRED</span> |
| :-------------------------------------------------- | :------------------------------------------------------ |
| [BadgeProps](../../../../../../Badges/Badge/Badge.types.ts)                                      | Yes                                                     |

### `badgePosition`

Optional enum to set the position for the Badge.

| <span style="color:gray;font-size:14px">TYPE</span> | <span style="color:gray;font-size:14px">REQUIRED</span> | <span style="color:gray;font-size:14px">DEFAULT</span> |
| :-------------------------------------------------- | :------------------------------------------------------ | :----------------------------------------------------- |
| [AvatarBadgePositions](../../Avatar.types.ts)          | No                                                     | [AvatarBadgePositions.TopRight](../../Avatar.types.ts)                                        |

## Usage

```javascript
const avatarProps: AvatarProps = {
  variant: AvatarVariants.JazzIcon,
  size: AvatarSizes.Md,
  address: SAMPLE_JAZZICON_ADDRESS,
  backgroundColor :'#000000'
}
const badgeProps: BadgeProps = {
  variant: BadgeVariants.Avatar,
  avatarProps
}

<AvatarBaseWithBadge 
  size={AvatarSizes.Md}
  backgroundColor={'#000000'}
  isBadgeIncluded
  badgeProps={badgeProps}
  badgePosition={AvatarBadgePositions.BottomRight}>
    <SAMPLE_COMPONENT />
</AvatarBaseWithBadge>;
```