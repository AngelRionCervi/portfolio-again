import BurgerMenuContext from './BurgerMenuContext'
import ModalContext from './ModalContext'

interface ComposeProps {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  children: React.ReactNode
}

function Compose({ components = [], children }: ComposeProps) {
  return (
    <>
      {components.reduceRight(
        (acc, Comp) => (
          <Comp>{acc}</Comp>
        ),
        children
      )}
    </>
  )
}

export default function ContextReducer({ children }: { children: React.ReactNode }) {
  return <Compose components={[BurgerMenuContext, ModalContext]}>{children}</Compose>
}
