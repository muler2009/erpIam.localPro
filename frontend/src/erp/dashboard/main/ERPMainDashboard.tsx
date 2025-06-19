import { Footer } from '../../../iam/components/reusable'
import Header from '../reusable/Header'
import ERPModuleMenu from '../views/dashboard-mini-components/ERPModuleMenu'

const ERPMainDashboard = () => {
  return (
   <>
    <Header />
    <ERPModuleMenu />
    <Footer />
   </>
  )
}

export default ERPMainDashboard