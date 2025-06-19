import React from 'react'
import { erpModule, modules } from '../../constants/erpmodule'
import { Link } from 'react-router-dom'

const ERPModuleMenu = () => {
  return (
    <div className="w-[calc(100vw-400px)] mx-auto h-[calc(100vh-100px)] bg-gray-50 flex justify-center items-center border-l border-r"> {/* 64px if your <Header /> is 64px tall */}
      {/* <div className="flex flex-wrap gap-6 justify-center max-w-4xl ">
        {modules?.map((module, index) => (
          <div key={index} className="w-40 flex flex-col items-center gap-2 h-full">
            <div className="w-20 h-20 border flex items-center justify-center text-2xl">
              {module.icon}
            </div>
            <div className="text-center text-lg font-medium">
              {module.title}
            </div>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-3 gap-6">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="group border-0 px-5 py-3 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${module.gradient}`}></div>
                  <div className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${module.gradient} shadow-lg`}>
                        <div className="h-6 w-6 text-white">
                          {module.icon}
                        </div>
                      </div>
                      {module.isActive && (
                        <div className="bg-emerald-100 text-emerald-700 border-emerald-200">
                          <div className="h-3 w-3 mr-1" />
                          Active
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg group-hover:text-blue-600 transition-colors">
                        {module.title}
                      </div>
                      <div className="text-slate-600">{module.description}</div>
                    </div>
                  </div>
                  <div className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{module.stats.value}</p>
                        <p className="text-xs text-slate-500">{module.stats.label}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600">{module.stats.trend}</span>
                      </div>
                    </div>
                    <Link className='' to={module.path}>
                      <button className="w-full group-hover:bg-slate-900 transition-colors">
                        Open Module
                        <div className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default ERPModuleMenu