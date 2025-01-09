/* eslint-disable no-unused-vars */
/**
 * 所有 window 类型放置于此处
 */
 declare global {
  interface Window {
   	[key:string]:any;
  }
  interface Document{
	  [key:string]: any
  }
}

declare namespace doraemon{}